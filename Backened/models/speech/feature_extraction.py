import numpy as np
from jiwer import wer  # Only wer is used now

def compute_features(reference, transcript, words):
    # WER as float
    error_rate = wer(reference.lower(), transcript.lower())

    # Pause durations
    pauses = []
    for i in range(1, len(words)):
        pause = words[i]["start"] - words[i - 1]["end"]
        if pause > 0:
            pauses.append(pause)

    # Word durations and timings
    word_durations = [w["end"] - w["start"] for w in words if w["end"] > w["start"]]
    total_time = words[-1]["end"] - words[0]["start"] if words else 0
    speech_time = sum(word_durations)

    # Feature dictionary
    features = {
        "wer": error_rate,
        "mean_word_duration": np.mean(word_durations) if word_durations else 0,
        "mean_pause": np.mean(pauses) if pauses else 0,
        "pause_count": sum(p > 0.2 for p in pauses),
        "wpm": (len(words) / total_time) * 60 if total_time > 0 else 0,
        "articulation_rate": (len(words) / speech_time) if speech_time > 0 else 0
    }

    return features

def rule_based_predict(features):
    score = 0
    if features["wer"] >= 0.15:
        score += 1
    if features["pause_count"] >= 5:
        score += 1
    if features["wpm"] <= 80:
        score += 1
    return "Likely Dyslexia" if score >= 2 else "Typical"
