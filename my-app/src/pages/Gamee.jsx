import { useState, useEffect } from "react";

// Random word generator
function generateRandomText() {
  const words = [
    "apple", "bridge", "sunlight", "memory", "learning", "beautiful",
    "science", "keyboard", "mountain", "galaxy", "future", "language",
    "creative", "freedom", "knowledge", "moment", "ocean", "planet"
  ];

  const sentenceLength = Math.floor(Math.random() * 3) + 1; // 1 to 3 words
  let sentence = [];

  for (let i = 0; i < sentenceLength; i++) {
    sentence.push(words[Math.floor(Math.random() * words.length)]);
  }

  return sentence.join(" ");
}

export default function Game() {
  const [word, setWord] = useState("");
  const [hidden, setHidden] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    generateNewWord();
  }, []);

  // Generate a NEW word
  const generateNewWord = () => {
    const randomText = generateRandomText();
    setWord(randomText);
    resetState();
  };

  // Retry with SAME word
  const retrySameWord = () => {
    resetState();
  };

  // Reset general UI & hide countdown
  const resetState = () => {
    setHidden(false);
    setUserInput("");
    setResult("");
    setIsWrong(false);

    setTimeout(() => setHidden(true), 3000);
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === word.toLowerCase()) {
      setResult("✔ Correct! 🎉");
      setIsWrong(false);
    } else {
      setResult(`❌ Wrong! Correct Answer: "${word}"`);
      setIsWrong(true);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fef9e2] py-12">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#CC9966] mb-8 drop-shadow-lg">
        Memory Checker Game
      </h1>

      {/* Word Display Box */}
      <div className="text-2xl font-semibold text-gray-900 bg-white shadow-2xl px-12 py-6 rounded-2xl border border-indigo-300 min-h-[70px] flex items-center justify-center transition-all duration-300">
        {hidden ? (
          <span className="tracking-widest text-indigo-500">Guess the word</span>
        ) : (
          <span className="animate-pulse">{word}</span>
        )}
      </div>

      {/* User Input */}
      <input
        type="text"
        placeholder="Enter the word you remember..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="mt-6 px-4 py-3 w-80 text-lg border border-indigo-400 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
      />

      {/* Check Answer Button */}
      <button
        onClick={checkAnswer}
        className="mt-6 px-8 py-3 bg-[#CC9966] text-white text-lg font-semibold rounded-xl hover:bg-brown shadow-lg transition"
      >
        Check Answer
      </button>

      {/* Result */}
      <p className="mt-5 text-xl font-bold text-gray-900">{result}</p>

      {/* Buttons: Retry + Next */}
      {isWrong && (
        <div className="flex gap-4 mt-6">

          {/* Retry (same word) */}
          <button
            onClick={retrySameWord}
            className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 shadow-lg transition"
          >
            Retry
          </button>

          {/* Next Word (new word) */}
          <button
            onClick={generateNewWord}
            className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 shadow-lg transition"
          >
            Next Word
          </button>

        </div>
      )}
    </div>
  );
}
