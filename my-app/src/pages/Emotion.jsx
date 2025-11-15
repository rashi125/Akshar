// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import Navabar from "../components/Navbar"
// const EmotionML = () => {
//   const API_BASE = "http://localhost:8000/adaptive"; // adjust if needed
//   // const socketRef =  io(API_BASE, { transports: ["websocket", "polling"] });

//   // UI states
//   const [emotion, setEmotion] = useState("Neutral");
//   const [engagement, setEngagement] = useState(100);
//   const [frustration, setFrustration] = useState(0);

//   const [startScreenVisible, setStartScreenVisible] = useState(true);
//   const [loadingVisible, setLoadingVisible] = useState(false);
//   const [exerciseAreaVisible, setExerciseAreaVisible] = useState(false);

//   const [currentExercise, setCurrentExercise] = useState(null);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [feedbackVisible, setFeedbackVisible] = useState(false);
//   const [feedbackTitle, setFeedbackTitle] = useState("");
//   const [feedbackText, setFeedbackText] = useState("");
//   const [feedbackCorrect, setFeedbackCorrect] = useState(false);
//   const [difficulty, setDifficulty] = useState(3);

//   useEffect(() => {
//     // initialize socket
//   const socket = io("http://localhost:8000/adaptive", {
//   transports: ["websocket", "polling"]
// });


//     socket.on("connect", () => console.log("[socket] connected"));
//     socket.on("disconnect", () => console.log("[socket] disconnected"));

//     socket.on("new_exercise", (data) => {
//       if (!data) return;
//       setCurrentExercise(data);
//       setSelectedAnswer("");
//     });

//     socket.on("update_emotion_badge", (data) => {
//       if (!data) return;
//       setEmotion((data.emotion || "Neutral").charAt(0).toUpperCase() + (data.emotion || "neutral").slice(1));
//       setEngagement(Math.round((data.engagement || 1) * 100));
//       setFrustration(Math.round((data.frustration || 0) * 100));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Start session
//   const startSession = async () => {
//     setLoadingVisible(true);
//     try {
//       const res = await fetch(`${API_BASE}/start_session`, { method: "POST" });
//       if (!res.ok) throw new Error("Failed to start session");
//       setStartScreenVisible(false);
//       setExerciseAreaVisible(true);
//       await fetchNextExercise();
//     } catch (err) {
//       console.error(err);
//       alert("Could not start session. Is the backend running?");
//     } finally {
//       setLoadingVisible(false);
//     }
//   };

//   const fetchNextExercise = async () => {
//     setLoadingVisible(true);
//     try {
//       const resp = await fetch(`${API_BASE}/get_next_exercise`);
//       if (!resp.ok) throw new Error("Failed to fetch exercise");
//       const text = await resp.text();
//       const ex = JSON.parse(text);
//       setCurrentExercise(ex);
//       setSelectedAnswer("");
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching exercise. See console.");
//     } finally {
//       setLoadingVisible(false);
//     }
//   };

//   const checkAnswer = () => {
//     if (!currentExercise) return;
//     if (!selectedAnswer && currentExercise.type !== "wordBuilding") {
//       alert("Please choose an answer before checking.");
//       return;
//     }
//     const correct = (currentExercise.correctAnswer || "").toLowerCase();
//     const isCorrect = selectedAnswer.toLowerCase() === correct;

//     setFeedbackCorrect(isCorrect);
//     setFeedbackTitle(isCorrect ? "Correct! 🎉" : "Not quite 😕");
//     setFeedbackText(isCorrect ? "Great job! You're making progress." : `The correct answer was "${currentExercise.correctAnswer}". Keep trying!`);
//     setDifficulty(3);
//     setFeedbackVisible(true);
//   };

//   const continueAfterFeedback = async () => {
//     setFeedbackVisible(false);
//     const perf = feedbackCorrect ? Math.max(0.05, Math.min(0.95, 1 - difficulty * 0.1)) : Math.max(0.05, Math.min(0.95, 0.5 - difficulty * 0.1));
//     setLoadingVisible(true);
//     try {
//       await fetch(`${API_BASE}/submit_performance`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ performanceScore: perf }),
//       });
//       await fetchNextExercise();
//     } catch (err) {
//       console.error(err);
//       alert("Could not submit performance. Try again.");
//     } finally {
//       setLoadingVisible(false);
//     }
//     {loadingVisible && (
//   <div className="text-center mt-6">
//     <div className="inline-block loader mb-4 border-4 border-gray-200 border-t-4 border-t-indigo-700 rounded-full w-10 h-10 animate-spin"></div>
//     <p className="text-gray-700">Loading...</p>
//   </div>
// )}
//   };

//   // Render the appropriate exercise view
//   const renderExerciseView = () => {
//     if (!currentExercise) return null;
//     switch (currentExercise.type) {
//       case "multipleChoice":
//         return (
//           <div className="exercise-card">
//             <h2 className="text-2xl font-semibold mb-4 text-center">{currentExercise.instruction}</h2>
//             {currentExercise.stimulus?.image && <img src={currentExercise.stimulus.image} alt="stimulus" className="mx-auto mb-4 w-40 h-40 object-cover" />}
//             {currentExercise.stimulus?.text && <div className="text-xl text-center bg-gray-50 p-4 rounded-lg mb-4">{currentExercise.stimulus.text}</div>}
//             <div className="space-y-3 mb-4">
//               {currentExercise.options?.map((opt, i) => (
//                 <button
//                   key={i}
//                   className={`option-btn w-full text-left ${selectedAnswer === opt ? "selected" : ""}`}
//                   onClick={() => setSelectedAnswer(String(opt).toLowerCase())}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//             <div className="text-center">
//               <button className="btn btn-primary" onClick={checkAnswer}>Check Answer</button>
//             </div>
//           </div>
//         );
//       // Other exercise types (wordBuilding, rhymeMatching, etc.) can be added similarly
//       // default:
//       //   return <div>Unknown exercise type: {currentExercise.type}</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 ">
//       {/* Emotion badge */}
//       {/* <Navabar/> */}
//       <div className="fixed right-4 top-4 bg-black/60 text-white px-3 py-1 rounded-md z-50 font-semibold">
//         Emotion: {emotion} • Eng: {engagement}% • Frus: {frustration}%
//       </div>

//       {/* Start screen */}
//       {startScreenVisible && (
//         <div className="exercise-card text-center">
//           <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
//           <p className="text-gray-600 mb-6">Ready to start your personalized learning session?</p>
//           <button className="btn btn-primary text-lg" onClick={startSession}>Start Session</button>
//         </div>
//       )}

//       {/* Loading */}
//       {loadingVisible && (
//         <div className="text-center mt-6">
//           <div className="inline-block loader mb-4 border-4 border-gray-200 border-t-4 border-t-indigo-700 rounded-full w-10 h-10 animate-spin"></div>
//           <p className="text-gray-700">Loading...</p>
//         </div>
//       )}

//       {/* Exercise area */}
//       {exerciseAreaVisible && renderExerciseView()}

//       {/* Feedback modal */}
//       {feedbackVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           <div className="exercise-card max-w-md w-full text-center">
//             <h3 className={`text-2xl font-bold mb-3 ${feedbackCorrect ? "text-green-600" : "text-red-600"}`}>{feedbackTitle}</h3>
//             <p className="text-gray-700 mb-4">{feedbackText}</p>
//             <label className="block text-left mb-2 font-medium">How difficult was it?</label>
//             <input type="range" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(parseInt(e.target.value, 10))} className="w-full mb-4"/>
//             <button className="btn btn-primary w-full" onClick={continueAfterFeedback}>Continue</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmotionML;
