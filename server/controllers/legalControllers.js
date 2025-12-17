const openai = require("../services/openai");
const { getChunks } = require("../services/chunking");

exports.ask = async (req, res) => {
  try {
    const { question } = req.body;
    const chunks = await getChunks(question);
    const answer = await openai.answer(question, chunks);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
