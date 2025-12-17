export default function AnswerCard({ result }) {
  if (result.answer === "No relevant legal provision found.") {
    return <div className="no-provision">{result.answer}</div>;
  }

  return (
    <div className="answer-card">
      <h3>Answer</h3>
      <p>{result.answer}</p>

      {result.citations?.length > 0 && (
        <>
          <h4>Citations</h4>
          <ul className="citation-list">
            {result.citations.map((c, i) => (
              <li key={i}>
                {c.law} — {c.article}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
