console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");
const app = require("./app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));