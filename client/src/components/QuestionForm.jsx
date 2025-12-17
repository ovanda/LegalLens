import { useState } from "react";
import { askQuestion } from "../services/api";

export default function QuestionForm({ setResult, setLoading, setError }) {
  const [question, setQuestion] = useState("");

  async function handleSubmit() {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await askQuestion(question);
      setResult(data);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    // Ctrl + Enter (Windows/Linux) OR Cmd + Enter (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        placeholder="Ask a legal question..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        required
      />

      <button type="submit">Ask</button>
    </form>
  );
}
