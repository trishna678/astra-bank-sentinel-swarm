const { investigatorAgent } = require("./investigatorAgent");
const { riskScoringAgent } = require("./riskScoringAgent");
const { entityLinkerAgent } = require("./entityLinkerAgent");
const { caseWriterAgent } = require("./caseWriterAgent");

function runInvestigation(input = {}) {
  const investigation = investigatorAgent(input);
  const scoring = riskScoringAgent(input);
  const linking = entityLinkerAgent(input);

  const report = caseWriterAgent({
    ...investigation,
    riskLevel: scoring.riskLevel,
    riskScore: scoring.riskScore,
    linkedEntities: linking.linkedEntities,
    scoringFactors: scoring.factors,
  });

  return {
    investigation,
    scoring,
    entityAnalysis: linking,
    report,
  };
}

module.exports = { runInvestigation };
