const { agentOrchestrator } = require("./agents/agentOrchestrator");

const sampleData = {
  caseId: "TEST-CASE-999",
  transactions: [
    {
      transactionId: "TX-101",
      accountId: "ACC-555",
      counterpartyId: "CP-888",
      amount: 4500,
      flagged: true,
      status: "success",
    },
    {
      transactionId: "TX-102",
      accountId: "ACC-555",
      counterpartyId: "CP-888",
      amount: 200,
      reviewRequired: true,
      status: "failed",
    },
  ],
};

console.log("=== RUNNING AGENT SWARM TEST ===");
const output = agentOrchestrator(sampleData);
console.log(JSON.stringify(output, null, 2));
