import "./styles.css";
import QuestionForm from "./components/QuestionForm";
import AnswerCard from "./components/AnswerCard";
import { useState, useRef, useEffect } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const answerRef = useRef(null);

  // 👉 Auto-scroll when result changes
  useEffect(() => {
    if (result && answerRef.current) {
      answerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  return (
    <div className="app-container">
      <div className="container">
        <h1>LegalLens</h1>

        <QuestionForm
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />

        {loading && <div className="loader"></div>}

        {error && <div className="error">{error}</div>}

        {result && !error && (
          <div ref={answerRef}>
            <AnswerCard result={result} />
          </div>
        )}
      </div>
    </div>
  );
    
}

export default App;
