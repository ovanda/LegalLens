

const express = require("express");
const router = express.Router();
const { queryDocuments } = require("../services/ragEngine");

// Ask a question (RAG)
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    const docs = await queryDocuments(question);
    res.json({ question, results: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process question" });
  }
});

module.exports = router;
