const express = require("express");
const router = express.Router();
const { Feedback } = require("../models");

// Add feedback
router.post("/", async (req, res) => {
  try {
    const { question, answer, isCorrect, confidenceScore } = req.body;
    const feedback = await Feedback.create({
      question,
      answer,
      isCorrect,
      confidenceScore,
    });
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// Summary for dashboard
router.get("/summary", async (req, res) => {
  try {
    const total = await Feedback.count();
    const correct = await Feedback.count({ where: { isCorrect: true } });
    const avgConfidence = await Feedback.avg("confidenceScore");
    res.json({
      total,
      correct,
      accuracy: total ? correct / total : 0,
      avgConfidence,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
