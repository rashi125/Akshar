// src/pages/HandwritingHelper.jsx
import React, { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import "./Handwriting.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // corrected import

const Handwriting = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle Analyze button
  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload your handwriting image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", childName);

      const response = await fetch("http://localhost:8000/hand", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error analyzing handwriting");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze handwriting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Download report
  const handleDownloadReport = () => {
    if (!result) return;

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${childName || "handwriting"}_report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={`min-h-screen w-full relative ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: theme === "dark" ? "#1f1f1f" : "#f5f5dc",
          backgroundImage: theme === "dark"
            ? `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
               linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
               linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)`
            : `linear-gradient(45deg, rgba(139, 69, 19, 0.25) 25%, transparent 25%),
               linear-gradient(-45deg, rgba(139, 69, 19, 0.25) 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.25) 75%),
               linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.25) 75%)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
          <div className="book-container max-w-[90vw] h-auto">
            <div className="book" id="book">
              {/* Page 1 */}
              <div className="page left page--front" id="page1">
                <div className="page-content text-center px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <span className="material-icons text-[var(--accent-color-1)] text-5xl sm:text-6xl">
                      edit
                    </span>
                    <h1 className="font-storybook text-3xl sm:text-5xl font-bold text-[var(--text-color)]">
                      Handwriting Helper
                    </h1>
                  </div>

                  <div className="mb-12 w-full max-w-md mx-auto">
                    <label
                      htmlFor="child-name"
                      className="font-storybook text-xl sm:text-3xl font-bold text-[var(--text-color)] mb-4 block"
                    >
                      What's your name, little writer?
                    </label>
                    <input
                      id="child-name"
                      name="child-name"
                      type="text"
                      placeholder="Type your name here..."
                      className="storybook-input w-full"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Page 2 */}
              <div className="page right page--back" id="page2">
                <div className="page-content text-center px-4 sm:px-6">
                  <h2 className="text-2xl sm:text-4xl font-bold font-storybook text-[var(--text-color)] mb-6">
                    Let's Check Your Writing!
                  </h2>
                  <p className="text-lg sm:text-xl font-handwriting text-gray-600 mb-8">
                    Upload a picture of your handwriting to see how you're doing.
                  </p>

                  <div className="mb-10 text-center w-full max-w-2xl mx-auto">
                    <label
                      htmlFor="reference-sentence"
                      className="text-xl sm:text-2xl font-bold font-storybook text-[var(--accent-color-2)] mb-3 block"
                    >
                      The sentence to write is:
                    </label>
                    <div className="bg-[#f0e8d9] border-2 border-dashed border-[var(--accent-color-2)] rounded-lg p-4 sm:p-6">
                      <p className="text-2xl sm:text-4xl text-[var(--text-color)] font-handwriting leading-relaxed">
                        the quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>

                  {/* Upload + Analyze */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                    <label className="storybook-button bg-[var(--accent-color-3)] cursor-pointer">
                      <span className="material-icons">cloud_upload</span>
                      <span>{file ? file.name : "Upload Your Writing"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>

                    <button
                      className="storybook-button bg-[var(--accent-color-1)]"
                      onClick={handleAnalyze}
                      disabled={loading}
                    >
                      {loading ? "Analyzing..." : "Analyze Now"}
                    </button>
                  </div>

                  {/* Results */}
                  {result && (
                    <div className="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-xl mx-auto">
                      <h3 className="text-xl font-bold mb-3 text-[var(--accent-color-1)]">
                        Analysis Result
                      </h3>
                      <pre className="text-left text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>

                      <button
                        onClick={handleDownloadReport}
                        className="storybook-button bg-[var(--accent-color-2)] mt-4"
                      >
                        Download Report
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Binding stitches */}
              <div className="page-binding">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="stitch"></div>
                ))}
              </div>

              <div className="book-spine"></div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="page-turn-btn"
          id="turn-page-btn"
        >
          <span className="material-icons">arrow_forward_ios</span>
        </button>
      </div>
    </main>
  );
};

export default Handwriting;
