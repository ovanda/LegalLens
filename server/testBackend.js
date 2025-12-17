const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function runTest() {
  try {
    // 1️⃣ Add a document
    const docRes = await axios.post(`${BASE_URL}/documents`, {
      title: "Sample Legal Article",
      content:
        "This is a sample legal document about contracts and obligations.",
    });
    console.log("Document added:", docRes.data);

    // 2️⃣ Ask a question
    const askRes = await axios.post(`${BASE_URL}/ask`, {
      question: "What is this document about?",
    });
    console.log("Query result:", askRes.data);

    // 3️⃣ Add feedback (simulate correctness)
    const feedbackRes = await axios.post(`${BASE_URL}/feedback`, {
      question: "What is this document about?",
      answer: askRes.data.results[0]?.content || "No answer",
      isCorrect: true,
      confidenceScore: 0.95,
    });
    console.log("Feedback saved:", feedbackRes.data);

    // 4️⃣ Fetch dashboard summary
    const summaryRes = await axios.get(`${BASE_URL}/feedback/summary`);
    console.log("Dashboard summary:", summaryRes.data);
  } catch (err) {
    console.error("Test script error:", err.response?.data || err.message);
  }
}

runTest();
