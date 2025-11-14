const Test = require("../models/tests");

// -------------------- Save Test Results --------------------
const saveTestResults = async (req, res) => {
  const { user, guestId, testType, data, eyeResult, speechResult, combinedResult } = req.body;

  try {
    if (!user && !guestId) {
      return res.status(400).json({ error: "Either user or guestId is required" });
    }

    const testEntry = new Test({
      user: user || null,
      guestId: guestId || null,
      testType,
      isGuest: !user
    });

    // -------------------- Eye + Speech --------------------
    if (testType === "eyeSpeech") {
      if (eyeResult) {
        testEntry.eyeTracking = {
          totalFixations: eyeResult.features?.n_fix ?? 0,
          averageFixationDuration: eyeResult.features?.mean_fix ?? 0,
          fixationDurationSD: eyeResult.features?.std_fix ?? 0,
          averageDisplacementX: eyeResult.features?.mean_disp_x ?? 0,
          displacementSDX: eyeResult.features?.std_disp_x ?? 0,
          regressionCount: eyeResult.features?.regression_ratio ?? 0,
          totalReadTime: eyeResult.features?.total_read_time ?? 0,
          lineSwitches: eyeResult.features?.line_switches ?? 0,
          dyslexiaRisk: eyeResult.label || "Pending",
          riskScore: eyeResult.score ?? 0,
          confidence: eyeResult.confidence ?? 0,
          rawOutput: eyeResult,
        };
      }

      if (speechResult) {
        testEntry.speechAnalysis = {
          totalWords: speechResult.totalWords || 0,
          mispronunciations: speechResult.mispronunciations || 0,
          speechRate: speechResult.speechRate || 0,
          pauses: speechResult.pauses || 0,
          clarityScore: speechResult.clarityScore || 0,
          pronunciationAccuracy: speechResult.pronunciationAccuracy || 0,
          articulationRate: speechResult.articulationRate || 0,
          fluencyScore: speechResult.fluencyScore || 0,
          comments: speechResult.comments || "",
          dyslexiaRisk: speechResult.label || "Pending",
          riskScore: speechResult.score || 0,
          rawOutput: speechResult
        };
      }

      if (combinedResult) {
        testEntry.combinedResult = {
          eyeScore: eyeResult?.score || 0,
          speechScore: speechResult?.score || 0,
          finalScore: combinedResult.combined || 0,
          label: combinedResult.label || "Pending",
          rawOutput: combinedResult
        };
        testEntry.overallRisk = combinedResult.label || "Pending";
      }
    }

    // -------------------- Quiz --------------------
  if (testType === "quiz" && req.body.quiz) {
  const { score, totalQuestions, answers, overallRisk } = req.body.quiz;
  testEntry.quiz = {
    score: score || 0,
    totalQuestions: totalQuestions || 0,
    answers: answers || [],
    overallRisk: overallRisk || "Pending",
  };
  testEntry.overallRisk = overallRisk || testEntry.overallRisk;
}

    // -------------------- Handwriting --------------------
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

    await testEntry.save();

    res.json({
      message: "Test results saved successfully",
      testEntry,
    });
  } catch (err) {
    console.error("❌ Save Test Results error:", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Get Tests --------------------
const getTestsByUser = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    if (!userId && !guestId)
      return res.status(400).json({ error: "userId or guestId query param required" });

    const filter = userId ? { user: userId } : { guestId };
    const tests = await Test.find(filter).sort({ createdAt: -1 });
    res.json({ tests });
  } catch (err) {
    console.error("❌ Get Tests error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { saveTestResults, getTestsByUser };
