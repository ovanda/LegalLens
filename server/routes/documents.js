const express = require("express");
const router = express.Router();
const { Document } = require("../models");
const { createDocumentEmbedding } = require("../services/ragEngine");

// Add new document
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const embedding = await createDocumentEmbedding(content);
    const doc = await Document.create({ title, content, embedding });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create document" });
  }
});

module.exports = router;

