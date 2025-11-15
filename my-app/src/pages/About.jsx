import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AboutDyslexia() {
  return (
    <div className="min-h-screen bg-[#E8C39E]">
      
      <Navbar />

      <div className="w-full px-4 sm:px-6 py-12 overflow-y-auto h-[800px]">

        <div className="bg-[#fef9e2] border border-[#d2b48c] shadow-xl rounded-2xl p-6 sm:p-10 
                        font-serif text-[#5c3e2a] leading-relaxed tracking-wide max-w-5xl mx-auto 
                        text-base sm:text-lg space-y-10 animate-fadeIn">

          {/* -------------------- Section 1 -------------------- */}
          <div className="bg-[#f5f7f2] border border-[#e2c6a8] shadow-md rounded-xl p-6 sm:p-8 space-y-4 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CC9966] text-center mb-2">
              📘 What is Dyslexia? 📘 
            </h2>

            <p>Dyslexia falls under the umbrella of <strong>“specific learning disorder.”</strong> This includes:</p>

            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Reading difficulties (Dyslexia)</strong></li>
              <li><strong>Writing difficulties (Dysgraphia)</strong></li>
              <li><strong>Math difficulties (Dyscalculia)</strong></li>
            </ul>
          </div>


          {/* -------------------- Section 2 -------------------- */}
          <div className="bg-[#f5f7f2] border border-[#e2c6a8] shadow-md rounded-xl p-6 sm:p-8 space-y-4 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CC9966] text-center mb-2">
              🔍 Common Signs in Children 🔍
            </h2>

            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Difficulty spelling simple words</li>
              <li>Trouble learning letter names</li>
              <li>Confusing d & b / p & q</li>
              <li>Struggles with rhyming</li>
              <li>Avoiding reading aloud</li>
              <li>Difficulty sounding out words</li>
              <li>Trouble connecting sounds to letters</li>
              <li>Mixing sound positions in words</li>
            </ul>

            <p>
              Having a few signs does not confirm dyslexia —
              <strong> screening helps determine support.</strong>
            </p>
          </div>


          {/* -------------------- Section 3 -------------------- */}
          <div className="bg-[#f5f7f2] border border-[#e2c6a8] shadow-md rounded-xl p-6 sm:p-8 space-y-4 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CC9966] text-center mb-2">
              📊 How Common is Dyslexia? 📊
            </h2>

            <p>Dyslexia affects <strong>10–20%</strong> of the world’s population. In India:</p>

            <div className="bg-[#fffaf0] shadow-md rounded-xl p-5 text-center space-y-2 border border-[#e2c6a8]">
              <p className="text-lg font-semibold">🇮🇳 200+ million people affected</p>
              <p className="text-lg font-semibold">🎒 35 million students</p>
              <p className="text-lg font-semibold text-red-600">⚠ 1 in 20 remain unidentified</p>
            </div>
          </div>


          {/* -------------------- Section 4 -------------------- */}
          <div className="bg-[#f5f7f2] border border-[#e2c6a8] shadow-md rounded-xl p-6 sm:p-8 space-y-4 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CC9966] text-center mb-2">
              🧪 How Is Dyslexia Assessed? 🧪
            </h2>

            <p>
              Professionals use <strong>standardized assessments</strong> to evaluate key reading and processing skills:
            </p>

            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>CTOPP</li>
              <li>Woodcock-Johnson Tests</li>
              <li>Rapid Automatized Naming (RAN)</li>
            </ul>
          </div>


          {/* -------------------- Section 5 -------------------- */}
          <div className="bg-[#f5f7f2] border border-[#e2c6a8] shadow-md rounded-xl p-6 sm:p-8 space-y-6 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#CC9966] text-center">
              🧠 Myths vs Facts 🧠
            </h2>

            <div className="space-y-4">
              <p className="text-lg font-semibold">
                ❌ <span className="text-red-600">Myth:</span> Dyslexia means low intelligence.<br />
                ✅ <span className="text-green-600">Fact:</span> Many have average or above-average intelligence.
              </p>

              <p className="text-lg font-semibold">
                ❌ <span className="text-red-600">Myth:</span> Kids need to try harder.<br />
                ✅ <span className="text-green-600">Fact:</span> Dyslexia is neurological.
              </p>

              <p className="text-lg font-semibold">
                ❌ <span className="text-red-600">Myth:</span> Dyslexia can’t be managed.<br />
                ✅ <span className="text-green-600">Fact:</span> With support, children thrive.
              </p>
            </div>
          </div>

          {/* -------------------- Learn More Button -------------------- */}
          <div className="w-full flex justify-center animate-fadeInSlow">
            <Link
              to="/ab"
              className="bg-[#CC9966] hover:bg-[#b68455] text-white font-semibold 
                         px-8 py-3 rounded-xl text-lg shadow-lg transition transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn { animation: fadeIn 0.7s ease-in-out; }
          .animate-fadeInSlow { animation: fadeIn 1.2s ease-in-out; }
          .animate-slideUp { animation: slideUp 0.8s ease-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { 
            from { transform: translateY(20px); opacity: 0; } 
            to { transform: translateY(0); opacity: 1; } 
          }
        `}
      </style>
    </div>
  );
}