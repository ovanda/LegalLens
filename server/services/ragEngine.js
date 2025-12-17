
const { Document } = require("../models");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Create embeddings for new documents
async function createDocumentEmbedding(content) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: content,
  });
  return response.data[0].embedding;
}

// Query documents using cosine similarity
async function queryDocuments(question) {
  const questionEmbedding = await createDocumentEmbedding(question);
  const docs = await Document.findAll();

  // Simple cosine similarity (vector math)
  const similarities = docs.map((doc) => {
    const dot = doc.embedding.reduce(
      (sum, val, i) => sum + val * questionEmbedding[i],
      0
    );
    const magA = Math.sqrt(
      doc.embedding.reduce((sum, val) => sum + val * val, 0)
    );
    const magB = Math.sqrt(
      questionEmbedding.reduce((sum, val) => sum + val * val, 0)
    );
    const similarity = dot / (magA * magB);
    return { doc, similarity };
  });

  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.slice(0, 5).map((s) => s.doc); // return top 5
}

module.exports = { createDocumentEmbedding, queryDocuments };
