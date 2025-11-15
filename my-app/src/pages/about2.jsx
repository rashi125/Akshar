import React from 'react';
import Navbar from '../components/Navbar';

export default function Ab() {
  return (
    <div className="min-h-screen bg-[#E8C39E]">
      <Navbar />

      {/* Content Container */}
      <div className="w-full px-4 sm:px-6 py-12 overflow-y-auto h-[800px]">
        <div className="bg-[#fdf5e6] border border-[#d2b48c] shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl p-6 sm:p-8 font-serif text-[#5c3e2a] leading-relaxed tracking-wide max-w-6xl mx-auto text-base sm:text-lg space-y-10">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Our Platform Services
          </h1>

          {/* INTRODUCTION */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p>
              Our platform offers a complete set of tools designed to detect
              learning difficulties and provide interactive reading support.
              We combine <strong>AI-powered detection</strong> with
              <strong> engaging learning activities</strong> to help users
              improve reading, speech, memory, writing, and focus.
            </p>
          </div>

          {/* SPEECH DETECTION */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">1. Speech Detection</h2>
            <p>Our speech detector analyzes how the user pronounces words and sentences. It identifies:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Mispronounced sounds</li>
              <li>Speech hesitations</li>
              <li>Skipped syllables or letters</li>
              <li>Reading pace and clarity</li>
            </ul>
            <p className="mt-2">
              This helps us understand the user's reading fluency and language-processing patterns.
            </p>
          </div>

          {/* HANDWRITING DETECTION */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">2. Handwriting Detection</h2>
            <p>Users upload an image of their handwriting, and our model detects:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Letter formation and spacing</li>
              <li>Reversed or rotated letters</li>
              <li>Irregular strokes and shapes</li>
              <li>Writing speed and consistency</li>
            </ul>
            <p className="mt-2">This helps identify writing-related challenges.</p>
          </div>

          {/* EYE TRACKING */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">3. Eye Tracking</h2>
            <p>Using simple webcam-based tracking, we observe:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Eye movement patterns</li>
              <li>Focus on words or lines</li>
              <li>Skipping or re-reading lines</li>
            </ul>
            <p className="mt-2">
              This helps detect reading difficulty and concentration levels.
            </p>
          </div>

          {/* READING SUPPORT TOOLS */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">4. Reading Support Tools</h2>
            <p>To assist readers in learning smoothly, we provide multiple tools:</p>

            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Live Line Highlighting:</strong> Helps users maintain focus while reading.
              </li>
              <li>
                <strong>Syllable Splitter:</strong> Breaks complex words into readable parts.
              </li>
              <li>
                <strong>Dual Transcription:</strong> Converts speech into:
                <ul className="list-disc list-inside ml-5 mt-1">
                  <li>Text</li>
                  <li>Audio feedback</li>
                </ul>
              </li>
              <li>
                <strong>Text-to-Speech & Voice Support:</strong> Users can read and listen simultaneously.
              </li>
            </ul>
          </div>

          {/* INTERACTIVE GAMES */}
          <div className="bg-white/70 border border-[#d8c3a5] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">5. Interactive Learning Games</h2>

            {/* Game 1 */}
            <div className="bg-white/60 border border-[#ccb8a0] rounded-lg p-4 mt-4 shadow-sm">
              <h3 className="text-xl font-bold">• Memory Checker Game</h3>
              <p>A word appears briefly, and the user must recall it. This improves:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Visual memory</li>
                <li>Word recognition</li>
                <li>Focus and attention</li>
              </ul>
            </div>

            {/* Game 2 */}
            <div className="bg-white/60 border border-[#ccb8a0] rounded-lg p-4 mt-6 shadow-sm">
              <h3 className="text-xl font-bold">• Emotion Tracker Game</h3>
              <p>AI observes emotional patterns while users answer adaptive questions.</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Stress and comfort monitoring</li>
                <li>Adaptive difficulty levels</li>
                <li>Personalized learning pace</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
