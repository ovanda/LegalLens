const { Document } = require("../models");

function cosineSim(A, B) {
  const dot = A.reduce((s, x, i) => s + x * B[i], 0);
  const magA = Math.sqrt(A.reduce((s, x) => s + x * x, 0));
  const magB = Math.sqrt(B.reduce((s, x) => s + x * x, 0));
  return dot / (magA * magB);
}

async function hybridSearch(queryEmbedding, limit = 5) {
  const docs = await Document.findAll();
  return docs
    .map((doc) => ({
      chunk: doc.chunk,
      score: cosineSim(queryEmbedding, doc.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = { hybridSearch };
