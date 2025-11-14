# models/Eye_track/app.py
import torch
import numpy as np
import pandas as pd
from collections import deque
from datetime import datetime
import joblib
import os
from fastapi import APIRouter
import csv
eye_router = APIRouter()

# ── Load model & scaler ───────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "dyslexia_mlp_final.pth")
SCALER_PATH = os.path.join(BASE_DIR, "models", "metrics_scaler_final.joblib")
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class MLP(torch.nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.net = torch.nn.Sequential(
            torch.nn.Linear(input_dim, 64),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.3),
            torch.nn.Linear(64, 2)
        )
    def forward(self, x):
        return self.net(x)

scaler = joblib.load(SCALER_PATH)
model = MLP(input_dim=len(scaler.feature_names_in_)).to(DEVICE)
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model.eval()

# ── Eye history ───────────────────────────────
eye_history = deque(maxlen=100)

def extract_gaze_features():
    if len(eye_history) < 5:
        return None
    coords = np.array(eye_history)
    diffs  = np.diff(coords, axis=0)
    if diffs.size == 0:
        return None
    speeds = np.linalg.norm(diffs, axis=1)
    if speeds.size == 0 or np.isnan(speeds).all():
        return None

    fix_speeds = speeds[speeds < 2]
    if fix_speeds.size == 0:
        return None

    feats = {
        'n_fix': len(coords),
        'mean_fix': float(fix_speeds.mean()),
        'std_fix': float(fix_speeds.std()),
        'mean_disp_x': float(np.abs(diffs[:,0]).mean()),
        'std_disp_x': float(diffs[:,0].std()),
        'regression_ratio': float((diffs[:,0] < 0).sum()) / len(diffs),
        'total_read_time': len(coords) * 0.2,
        'line_switches': int((np.abs(diffs[:,1]) > 40).sum()),
        'class_id': 0
    }
    return pd.DataFrame([feats])

def predict_from_features(df_feats):
    try:
        df_feats = df_feats[scaler.feature_names_in_]
        scaled   = scaler.transform(df_feats)
        t        = torch.tensor(scaled, dtype=torch.float32).to(DEVICE)
        with torch.no_grad():
            out  = model(t)
            prob = torch.softmax(out, dim=1)[0,1].item()
        return prob
    except Exception as e:
        print("⚠️ Prediction error:", e)
        return None

# ── Utility for main.py ───────────────────────────────

def get_eye_result(data=None):
    if not data or len(data) < 5:
        return {"error": "Not enough gaze points"}

    try:
        eye_history.clear()
        for pt in data:
            eye_history.append((pt[0], pt[1]))

        feats = extract_gaze_features()
        if feats is None:
            return {"error": "Failed to extract features"}
        feats_dict = feats.to_dict("records")[0]
        prob = predict_from_features(feats)
        if prob is None:
            return {"error": "Prediction failed"}

        label = "🧠 Dyslexic" if prob > 0.5 else "✔️ Typical"
        sv_row = {
            "timestamp": datetime.now().isoformat(),
            **feats_dict,
            "prediction_label": label,
            "prediction_score": float(prob)
        }

        # Save to CSV
        save_to_csv(sv_row)
        return {
            "label": label,
            "score": round(prob, 2),
            "confidence": round(prob, 2),
            "raw_score": float(prob)
        }

    except Exception as e:
        return {"error": f"Eye processing exception: {str(e)}"}

# ── FastAPI endpoint ───────────────────────────────
@eye_router.post("/result")
def eye_result(payload: dict):
    data = payload.get("gaze_points", [])
    return get_eye_result(data)
CSV_PATH = os.path.join(os.path.dirname(__file__), "eye_logs.csv")

def save_to_csv(feats_dict):
    file_exists = os.path.isfile(CSV_PATH)

    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=feats_dict.keys())

        if not file_exists:
            writer.writeheader()

        writer.writerow(feats_dict)