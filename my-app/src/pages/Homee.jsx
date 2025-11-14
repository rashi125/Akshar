import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

//   const images = [
//     "https://via.placeholder.com/900x300?text=Slide+1",
//     "https://via.placeholder.com/900x300?text=Slide+2",
//     "https://via.placeholder.com/900x300?text=Slide+3"
//   ];

  const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="w-full min-h-screen bg-[#fef9e2] ">

      {/* 🔵 Big App Title Section */}
      <div className="w-full py-12 text-center bg-[#CC9966] shadow-lg">
        <h1 className="text-6xl md:text-[100px] font-bold text-[#fef9e2]">
         AKSHAR MITR
        </h1>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-8 py-3 bg-[#F7F5F2] text-[#CC9966] font-bold rounded-xl shadow-md hover:bg-blue-100 transition"
        >
          Login
        </button>
      </div>

      {/* Carousel */}
      {/* <div className="w-full flex justify-center mt-6">
        <div className="w-11/12 md:w-3/4 rounded-xl overflow-hidden shadow-lg border border-blue-300">
          <img
            src={images[index]}
            alt="carousel slide"
            className="w-full h-48 md:h-72 object-cover"
          />
        </div>
      </div> */}

      {/* About Section */}
      <section className="w-11/12 md:w-3/4 mx-auto mt-10 p-6 bg-[#F7F5F2] rounded-xl shadow-lg">
        <h2 className="text-2xl font-extrabold text-[#CC9966] mb-3">
          About Dyslexia
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Dyslexia is a learning difficulty that affects reading and writing skills.
          Our platform helps users practice memory, reading, pattern recognition
          and more through interactive games.
        </p>

        {/* Read More → /about */}
        <button
          onClick={() => navigate("/about")}
          className="mt-5 px-6 py-2 bg-[#CC9966] text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Read More
        </button>
      </section>

      {/* Game Section */}
      <section className="w-11/12 md:w-3/4 mx-auto mt-10 mb-10 p-6 bg-[#F7F5F2] border border-blue-300 rounded-xl shadow-md">
        <h2 className="text-2xl font-extrabold text-[#CC9966] mb-2">
          Memory Checker Game
        </h2>
        <p className="text-gray-800 mb-4">
          Test and improve your memory by recalling the displayed word or sentence!
        </p>

        {/* Play Now → /game */}
        <button
          onClick={() => navigate("/gamee")}
          className="px-6 py-2 bg-[#CC9966] text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Play Now
        </button>
      </section>

    </div>
  );
}
