const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

exports.answer = async (question, chunks) => {
  const prompt = `${chunks}


Question: ${question}`;
  const res = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });
  return res.output_text;
};


const fs = require("fs");
const path = require("path");

exports.getChunks = async (question) => {
  const dbPath = path.join(__dirname, "../data/lawdb.txt");
  const text = fs.readFileSync(dbPath, "utf-8");
  return text.slice(0, 2000); // simple placeholder
};