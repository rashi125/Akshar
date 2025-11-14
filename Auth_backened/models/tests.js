// models/tests.js
const mongoose = require("mongoose");

// -------------------- Quiz Sub-Schemas --------------------
const AnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  selectedOption: { type: String },
  score: { type: Number, default: 0 },
});

const QuizSchema = new mongoose.Schema({
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  answers: [AnswerSchema],
  overallRisk: { type: String },
});

// -------------------- Main Test Schema --------------------
const TestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // optional for guest
    guestId: { type: String, default: null }, // guest identifier
    testType: { type: String }, // eyeSpeech, handwriting, quiz, etc.
    isGuest: { type: Boolean, default: false },

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
      rawOutput: Object,
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
      riskScore: Number,
       rawOutput: Object,
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
    quiz: QuizSchema,

    // -------------------- Combined --------------------
    overallRisk: String,
    combinedResult: {
      eyeScore: Number,
      speechScore: Number,
      finalScore: Number,
      label: String,
            rawOutput: Object,
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
