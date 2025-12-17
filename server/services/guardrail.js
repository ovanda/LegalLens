function legalGuardrail(q) {
  const banned = ["fraud", "scam", "evade", "illegal"];
  if (banned.some((w) => q.toLowerCase().includes(w))) {
    return {
      allowed: false,
      message:
        "I can help only with legal, safe questions. Please reword your question.",
    };
  }
  return { allowed: true };
}
module.exports = { legalGuardrail };
