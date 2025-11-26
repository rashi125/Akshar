import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const REACT_API=process.env.REACT_APP_API_URL;
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Consent message before login
    const consent = window.confirm(
      "By logging in, you consent to the collection and use of your data for analysis to improve our Dyslexia support services.\n\nDo you agree to continue?"
    );

    if (!consent) {
      alert("Thank you for your time, but you are not eligible to continue without consent.");
      return; // stop login process
    }

    try {
      const res = await axios.post(`${REACT_API}/api/auth/login`, form);

      // Save user info & token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Logged in successfully!");
      navigate("/home"); // ✅ navigate to homepage
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fef9e2]">
      {/* LEFT SIDE - Welcome Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-12 md:px-20 text-left">
        <h1 className="text-[#CC9966] font-extrabold uppercase text-[60px] sm:text-[70px] md:text-[80px] lg:text-[100px] leading-tight tracking-tight drop-shadow-md">
          Welcome<br />to our <br />Dyslexia Website
        </h1>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 md:px-16 bg-[#fef9e2]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#CC9966] text-white p-10 rounded-3xl shadow-2xl shadow-black/60 border border-purple-700"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
            Sign In
          </h2>

          <div className="flex flex-col gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="p-3 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-3 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />

            <button
              type="submit"
              className="bg-[#E5B98D] text-white font-semibold py-3 rounded-xl hover:bg-[#C59E78] active:scale-[0.98] transition-transform duration-150"
            >
              Login
            </button>
          </div>

          <p className="text-gray-100 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline text-gray-200 hover:text-white cursor-pointer font-bold"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
