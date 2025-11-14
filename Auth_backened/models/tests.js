// models/tests.js
const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional for guest
    guestId: { type: String, required: false }, // add guestId for non-logged users

    // -------------------- Eye Tracking --------------------
  
eyeTracking: {
  totalFixations: Number,
  averageFixationDuration: Number,
  fixationDurationSD: Number,
  averageDisplacementX: Number,
  displacementSDX: Number,
  regressionCount: Number,
  totalReadTime: Number,
  lineSwitches: Number,
  dyslexiaRisk: String,
  riskScore: Number,
  confidence: Number,
  rawOutput: Object
},

    // -------------------- Speech Analysis --------------------
    speechAnalysis: {
      totalWords: Number,
      mispronunciations: Number,
      speechRate: Number,
      pauses: Number,
      clarityScore: Number,
      pronunciationAccuracy: Number,
      articulationRate: Number,
      fluencyScore: Number,
      comments: String,
      dyslexiaRisk: String, 
      riskScore: Number
    },

    // -------------------- Handwriting --------------------
    handwriting: {
      expectedSentence: String,
      ocrOutput: String,
      charErrorRate: Number,
      wordErrorRate: Number,
      substitutions: Number,
      insertions: Number,
      deletions: Number,
      reversedLetters: Number,
      dysgraphiaRisk: String,
      comments: String,
    },

    // -------------------- Quiz --------------------
    quiz: {
      score: Number,
      totalQuestions: Number,
      answers: [
        {
          question: String,
          selectedOption: String,
          score: Number,
        },
      ],
    },

    // -------------------- Combined --------------------
    overallRisk: String,
    combinedResult: {
      eyeScore: Number,
      speechScore: Number,
      finalScore: Number,
      label: String,
    },

  
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tests", TestSchema);
