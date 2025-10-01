// src/pages/EyeSpeech.js
import React, { useEffect, useRef, useState } from "react";
import webgazer from "webgazer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const EyeSpeech = ({theme,toggleTheme}) => {
  // ------------------- States --------------------
  const [gazePoints, setGazePoints] = useState([]);
  const [eyeResult, setEyeResult] = useState(null);
  const [speechResult, setSpeechResult] = useState(null);
  const [combinedResult, setCombinedResult] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const navigate = useNavigate();

  // ------------------- Refs --------------------
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ------------------- Eye Tracking --------------------
  useEffect(() => {
    if (window.webgazer) {
      window.webgazer
        .setGazeListener((data) => {
          if (data) {
            setGazePoints((prev) => {
              const newPoints = [...prev, [data.x, data.y]];
              return newPoints.length > 100 ? newPoints.slice(1) : newPoints;
            });
          }
        })
        .begin();
    }
  }, []);

  const sendEyeData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/eye/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gaze_points: gazePoints }),
      });
      const data = await res.json();
      setEyeResult(data);
      return data;
    } catch {
      const err = { error: "Eye API not reachable" };
      setEyeResult(err);
      return err;
    }
  };

  // ------------------- Speech Recording --------------------
  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm; codecs=opus",
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setRecording(false);
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));

        const formData = new FormData();
        formData.append("file", blob, "reading.webm");
        formData.append(
          "text",
          "The quick brown fox jumps over the lazy dog."
        );

        try {
          const res = await fetch("http://127.0.0.1:8000/speech/result", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          setSpeechResult(data);
        } catch {
          setSpeechResult({
            prediction: 0,
            error: "Speech API not reachable",
          });
        }
      };

      mediaRecorderRef.current.start();

      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
      }, 10000);
    } catch (err) {
      console.error("Microphone access error:", err);
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  // ------------------- Combined Result --------------------
  const getCombinedResult = async () => {
    const eye = eyeResult || (await sendEyeData());

    if (!speechResult || speechResult.error) {
      setCombinedResult({ error: "Please record speech first." });
      return;
    }

    const eyeScore = eye?.score ?? 0;
    const speechScore = speechResult?.prediction ?? 0;

    try {
      const res = await fetch("http://127.0.0.1:8000/combined-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eye_score: eyeScore, speech_score: speechScore }),
      });
      const data = await res.json();
      setCombinedResult(data);
    } catch {
      setCombinedResult({ error: "Combined API not reachable" });
    }
  };

  // ------------------- Auto trigger combined result --------------------
  useEffect(() => {
    if (speechResult && !speechResult.error) {
      getCombinedResult();
    }
  }, [speechResult, eyeResult]);

  // ------------------- JSX --------------------
  return (
    <div className="flex flex-col">
      <Navbar />
      <div
        style={{
          backgroundColor: "#e3f2fd",
          backgroundImage: `
            repeating-linear-gradient(to right,#bbdefb,#bbdefb 1px,transparent 1px,transparent 100%),
            repeating-linear-gradient(to bottom,#bbdefb,#bbdefb 1px,transparent 1px,transparent 32px)
          `,
          backgroundSize: "32px 32px",
        }}
        className="playbook-bg min-h-screen p-6 font-sans pt-[50px] gap-4 dark:bg-zinc-800"
      >
        <div
          className="w-1/2vw min-h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-15 gap-y-4 relative inline-stretch"
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            border: "1px solid #CFD8DC",
          }}
        >
          {/* Left Side: Eye + Speech */}
          <div className="floating w-full max-w-6xl position-relative mx-auto playbook-binding">
            <div className="space-y-6 bg-white p-6 sm:p-8 md:p-10 flex flex-col rounded-2xl shadow-lg shadow-gray-700 gap-2 flex-grow transition-all hover:shadow-2xl">
              <h2
                className="text-center text-4xl md:text-6xl font-bold text-blue-600 mb-4"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                MY PLAYBOOK
              </h2>
              <nav className="flex justify-center space-x-2 sm:space-x-4 mb-8">
                <a className="overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%,0%_85%)] bg-blue-100 text-blue-800 px-4 py-2 text-lg font-bold rounded-t-lg hover:bg-blue-200 transition" >EYE</a>
                <a className="overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%,0%_85%)] bg-yellow-100 text-yellow-800 px-4 py-2 text-lg font-bold rounded-t-lg hover:bg-yellow-200 transition" >SPEECH</a>
                <a className="overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%,0%_85%)] bg-green-100 text-green-800 px-4 py-2 text-lg font-bold rounded-t-lg hover:bg-green-200 transition" >COMBINED</a>
                <a className="overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%,0%_85%)] bg-red-100 text-red-800 px-4 py-2 text-lg font-bold rounded-t-lg hover:bg-red-200 transition" >Result</a>
              </nav>

              {/* Eye Gaze Card */}
              <div className="space-y-12 w-full bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl border border-blue-200 dark:border-blue-700 mb-6 px-4 floating">
                <h2 className="text-blue-600 text-xl sm:text-2xl font-bold mb-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl">
                    visibility
                  </span>
                  Eye Gaze Game
                </h2>
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full h-32 sm:w-1/2 aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-400"
                >
                  <p>CAMERA FEED</p>
                </video>
                <button
                  onClick={sendEyeData}
                  className="transition-all hover:shadow-2xl bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition flex items-center gap-2 justify-center animate-bounce"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  Start Game
                </button>
              </div>

              {/* Speech Analysis Card */}
              <div className="space-y-6 bg-yellow-50 p-6 rounded-xl border border-yellow-400">
                <h3 className="text-3xl font-bold text-yellow-500 mb-2">
                  🎤 Speech Analysis
                </h3>
                <p className="mt-4 text-3xl">
                  <h3>Read this:</h3>
                  <strong>
                    The quick brown fox jumps over the lazy dog.
                  </strong>
                </p>
                <button
                  onClick={startRecording}
                  disabled={recording}
                  className="transition-all hover:shadow-2xl bg-yellow-500 text-white text-2xl px-4 py-2 rounded-2xl shadow cursor-pointer transition-transform active:-translate-y-[3px] animate-bounce"
                >
                  {recording ? "Recording..." : "Start Reading"}
                </button>

                <p className="text-lg text-gray-500 mt-2">
                  Auto-stops after 10 seconds.
                </p>
                {audioUrl && <audio src={audioUrl} controls className="mt-3" />}
              </div>
            </div>
          </div>

          {/* Divider Strip */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-6 bg-gray-300"
            style={{
              transform: "translateX(-50%)",
              backgroundImage:
                "linear-gradient(to bottom, #17151586 50%, transparent 50%)",
              backgroundSize: "4px 24px",
            }}
          ></div>

          {/* Right Side: Combined Results */}
          <div className="w-1/2vw transition-all hover:shadow-2xl floating bg-white p-6 sm:p-8 md:p-10 flex flex-col rounded-2xl shadow-lg shadow-gray-700 gap-4 flex-grow">
            <div className="space-y-12 bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-4">
               
                Your Progress
              </h2>
              <div className="space-y-6 text-lg">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <p className="text-4xl font-bold">Eye Gaze Game:</p>
                  <span className="font-semibold text-3xl">
                    {eyeResult?.label || eyeResult?.error || "Not tested"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <h2 className="font-bold text-4xl">Speech:</h2>
                  <span className="font-semibold text-3xl">
                    {speechResult?.prediction !== undefined
                      ? speechResult.prediction > 0
                        ? "🧠 Dyslexic"
                        : "✔️ Typical"
                      : speechResult?.error || "Not tested"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <strong className="font-bold text-4xl">Combined Score:</strong>
                  <span className="font-semibold text-3xl">
                    {combinedResult?.combined ||
                      combinedResult?.error ||
                      "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={getCombinedResult}
                className="transition-all hover:shadow-2xl mt-2 bg-green-700 text-white px-4 py-2 rounded-[1rem] shadow hover:bg-green-800 transition-transform transform translate-x-4 flex items-center gap-2 justify-center animate-bounce"
              >
                Get Combined Result
              </button>
            </div>
          </div>
        </div>
         <button 
                  onClick={() => navigate("/handwriting")}

         className="page-turn-btn" id="turn-page-btn">
              <span className="material-icons">arrow_forward_ios</span>
            </button>
      </div>
    </div>
  );
};

export default EyeSpeech;
