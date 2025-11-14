// controllers/testController.js
const Test = require("../models/tests");
const User = require("../models/user");

// -------------------- Save Test Results --------------------
const saveTestResults = async (req, res) => {
  const {
    user,
    testType,
    data,
    eyeResult,
    speechResult,
    combinedResult
  } = req.body;

  try {
    // -------------------- Validate user --------------------
    if (!user) {
      return res.status(400).json({ error: "User is required" });
    }

    const testEntry = new Test({ user, isGuest: false });

    // -------------------- Handle Eye + Speech Results --------------------
    if (testType === "eyeSpeech") {
  const eye = eyeResult || {};
  const speech = speechResult || {};
  const combined = combinedResult || {};

  // 🧠 Eye Tracking
  testEntry.eyeTracking = {
    totalFixations: eye.features?.n_fix ?? 0,
    averageFixationDuration: eye.features?.mean_fix ?? 0,
    fixationDurationSD: eye.features?.std_fix ?? 0,
    averageDisplacementX: eye.features?.mean_disp_x ?? 0,
    displacementSDX: eye.features?.std_disp_x ?? 0,
    regressionCount: eye.features?.regression_ratio ?? 0,
    totalReadTime: eye.features?.total_read_time ?? 0,
    lineSwitches: eye.features?.line_switches ?? 0,
    dyslexiaRisk: eye.label || "Pending",
    riskScore: eye.score ?? 0,
    confidence: eye.confidence ?? 0,
    rawOutput: eye
  };

      // Speech Analysis
      testEntry.speechAnalysis = {
        totalWords: speechResult?.totalWords || 0,
        mispronunciations: speechResult?.mispronunciations || 0,
        speechRate: speechResult?.speechRate || 0,
        pauses: speechResult?.pauses || 0,
        clarityScore: speechResult?.clarityScore || 0,
        pronunciationAccuracy: speechResult?.pronunciationAccuracy || 0,
        articulationRate: speechResult?.articulationRate || 0,
        fluencyScore: speechResult?.fluencyScore || 0,
        comments: speechResult?.comments || "",
        dyslexiaRisk: speechResult?.label || "Pending",
        riskScore: speechResult?.score || 0
      };

      // Combined Result
      testEntry.combinedResult = {
        eyeScore: eyeResult?.score || 0,
        speechScore: speechResult?.score || 0,
        finalScore: combinedResult?.combined || 0,
        label: combinedResult?.label || "Pending"
      };

      testEntry.overallRisk = combinedResult?.label || "Pending";
    }

    // -------------------- Handle Handwriting --------------------
    if (testType === "handwriting" && data) {
      testEntry.handwriting = {
        expectedSentence: data.expected || "",
        ocrOutput: data.ocr_output || "",
        charErrorRate: data.char_error_rate || 0,
        wordErrorRate: data.word_error_rate || 0,
        substitutions: data.substitutions || 0,
        insertions: data.insertions || 0,
        deletions: data.deletions || 0,
        reversedLetters: data.reversed_letters || 0,
        dysgraphiaRisk: data.dysgraphia_risk || "Unknown",
        comments: data.comments || "",
      };
    }

    // -------------------- Handle Quiz --------------------
    if (testType === "quiz" && data) {
      testEntry.quiz = {
        score: data.score || 0,
        totalQuestions: data.totalQuestions || 0,
        answers: data.answers || [],
      };
      testEntry.overallRisk = data.overallRisk || testEntry.overallRisk;
    }

    // -------------------- Save Test Entry --------------------
    await testEntry.save();
    console.log("✅ Saved Test:", testEntry._id);

    res.json({
      message: "Test results saved successfully",
      testEntry
    });
  } catch (err) {
    console.error("❌ Save Test Results error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Get Tests by User --------------------
const getTestsByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId)
      return res.status(400).json({ error: "userId query param required" });

    const tests = await Test.find({ user: userId }).sort({ createdAt: -1 });

    res.json({ tests });
  } catch (err) {
    console.error("❌ Get Tests error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveTestResults, getTestsByUser };
