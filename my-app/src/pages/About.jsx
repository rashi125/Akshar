import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AboutDyslexia() {
  return (
    <div className="min-h-screen bg-[#E8C39E]">
      {/* Navbar */}
      <Navbar />

      {/* Content Container */}
      <div className="w-full px-4 sm:px-6 py-12 overflow-y-auto h-[800px]">
        <div className="bg-[#fef9e2] border border-[#d2b48c] shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl p-6 sm:p-8 font-serif text-[#5c3e2a] leading-relaxed tracking-wide max-w-8xl mx-auto text-base sm:text-lg space-y-6">
        <p className="text-gray-800 leading-relaxed">
    Dyslexia falls under the umbrella of <strong>“specific learning disorder.”</strong> 
    This disorder has three main subtypes: 
    <strong> Reading (dyslexia)</strong>, 
    <strong> Writing (dysgraphia)</strong>, and 
    <strong> Math (dyscalculia)</strong>.
  </p>

  <p className="text-gray-800 leading-relaxed">
    As a child gets older, dyslexia can often look like:
  </p>

  {/* Symptoms List */}
  <ul className="list-disc list-inside space-y-1 pl-4 text-gray-800">
    <li>Difficulty spelling simple words.</li>
    <li>Trouble learning the names of letters.</li>
    <li>Problems distinguishing letters like “d & b” or “p & q.”</li>
    <li>Trouble rhyming.</li>
    <li>Reluctance to read aloud in class.</li>
    <li>Trouble sounding out new words.</li>
    <li>Difficulty connecting sounds with letters.</li>
    <li>Difficulty blending sounds together.</li>
    <li>Mixing up the position of sounds in a word.</li>
  </ul>

  <p className="text-gray-800 leading-relaxed">
    Having one of the above signs doesn’t confirm dyslexia, but if a child struggles 
    with foundational reading skills, screening and assessment can help determine if 
    support is needed.
  </p>

  <p className="text-gray-800 leading-relaxed">
    Dyslexia affects an estimated <strong>10–20%</strong> of the world’s population. 
    In India alone, over <strong>200 million people</strong> — including 
    <strong> 35 million students</strong> — live with this learning difference. 
    Yet, nearly <strong>1 in 20</strong> remain unidentified.
  </p>

  <p className="text-gray-800 leading-relaxed">
    <strong>Standardized assessments:</strong> Tests such as the Comprehensive Test of 
    Phonological Processing (CTOPP) or the Woodcock-Johnson Tests of Achievement are 
    commonly used to evaluate skills like phonological awareness and rapid naming.
  </p>

  {/* --- Myths vs Facts Sub-Section --- */}
  <div className="mt-10 w-full flex flex-col items-center">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#CC9966] text-center mb-6">
      Myths vs Facts
    </h3>

    <div className="w-full sm:w-3/4 md:w-1/2 bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">

      <p className="text-gray-900 text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
        ❌ <span className="text-red-600 font-bold">Myth:</span> Dyslexia means low intelligence.
        <br />
        ✅ <span className="text-green-600 font-bold">Fact:</span> Many individuals with dyslexia 
        have average or above-average intelligence.
      </p>

      <p className="text-gray-900 text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
        ❌ <span className="text-red-600 font-bold">Myth:</span> Children just need to try harder.
        <br />
        ✅ <span className="text-green-600 font-bold">Fact:</span> Dyslexia is a neurological 
        difference, not a lack of effort.
      </p>

      <p className="text-gray-900 text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
        ❌ <span className="text-red-600 font-bold">Myth:</span> Dyslexia can’t be managed.
        <br />
        ✅ <span className="text-green-600 font-bold">Fact:</span> With tools, strategies, and support, 
        individuals with dyslexia can excel academically and in life.
      </p>

            </div>
          </div>

          {/* Learn More Button */}
          <div className="w-full flex justify-center mt-8">
            <Link
              to="/ab"
              className="bg-[#CC9966] hover:bg-bROWN text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
