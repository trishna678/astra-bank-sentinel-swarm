function normalizeRisk(value) {
  const risk = String(value || "medium").toLowerCase();

  if (["high", "critical"].includes(risk)) return "high";
  if (["low"].includes(risk)) return "low";
  return "medium";
}

function caseWriterAgent(investigation = {}) {
  const findings = Array.isArray(investigation.findings)
    ? investigation.findings
    : [];

  const signals = Array.isArray(investigation.signals)
    ? investigation.signals
    : [];

  const entities = Array.isArray(investigation.linkedEntities)
    ? investigation.linkedEntities
    : [];

  const reasons = Array.isArray(investigation.reasons)
    ? investigation.reasons
    : [];

  const evidence = [
    ...findings.map((item) =>
      typeof item === "string" ? item : JSON.stringify(item)
    ),
    ...signals.map((item) =>
      typeof item === "string" ? item : JSON.stringify(item)
    ),
  ];

  const risk = normalizeRisk(investigation.riskLevel);

  const caseId = investigation.caseId || "DEMO-CASE-001";

  const reasoning = reasons.length
    ? reasons
    : [
        "Review the recorded evidence and verify whether the activity "
        + "is consistent with the customer's expected behavior.",
        "The risk category is a triage indicator, not proof of fraud.",
      ];

  const recommendedActions = [
    "Verify the transaction details and timestamps.",
    "Review the supporting evidence and linked entities.",
    "Check for alternative explanations and false positives.",
    "Escalate to an authorized human analyst when warranted.",
  ];

  return {
    caseId,
    title: investigation.title || "Suspicious Activity Investigation",
    status: "pending_human_review",

    riskSummary: {
      level: risk,
      score:
        Number.isFinite(Number(investigation.riskScore))
          ? Math.max(0, Math.min(100, Number(investigation.riskScore)))
          : null,
      explanation:
        "Risk is a preliminary assessment based on the supplied findings. "
        + "It is not a confirmed fraud determination.",
    },

    evidence: {
      signals: evidence,
      linkedEntities: entities,
      findings,
    },

    reasoning,

    recommendedAction: recommendedActions,

    humanOversight: {
      required: true,
      automaticAccountFreeze: false,
      message:
        "An authorized human analyst must review the evidence before "
        + "taking consequential account action. Never freeze an account "
        + "solely because of an automated risk score.",
    },

    generatedAt: new Date().toISOString(),
    demoMode: true,
  };
}

module.exports = { caseWriterAgent };
