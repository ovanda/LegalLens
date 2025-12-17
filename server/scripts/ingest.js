const fs = require("fs");
const path = require("path");
const { chunkText } = require("../services/chunker");
const { createEmbedding } = require("../services/embeddings");
const { Document, sequelize } = require("../models");

async function ingest() {
  await sequelize.sync();
  const raw = fs.readFileSync(
    path.join(__dirname, "../data/lawdb.txt"),
    "utf8"
  );
  const chunks = chunkText(raw);

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);
    await Document.create({ chunk, embedding });
  }

  console.log("Ingestion complete");
  process.exit();
}

ingest();
