// Investigator Agent
// Responsible for investigating suspicious transactions
// and correlating evidence found by the Scout Agent.

function investigatorAgent(flaggedTransactions) {
    const investigatedCases = [];

    for (const transaction of flaggedTransactions) {

        let severity = "LOW";

        if (transaction.score >= 80) {
            severity = "HIGH";
        } else if (transaction.score >= 60) {
            severity = "MEDIUM";
        }

        const linkedEntities = [];

        if (transaction.deviceReuse >= 3) {
            linkedEntities.push("Shared device");
            linkedEntities.push("Multiple linked accounts");
        }

        if (transaction.newBeneficiary) {
            linkedEntities.push("New beneficiary");
        }

        const investigation = {
            severity: severity,

            transactionId: transaction.id,

            amount: transaction.amount,

            device: transaction.device,

            location: transaction.city,

            beneficiary: transaction.beneficiary,

            suspiciousSignals: transaction.signals,

            linkedEntities: linkedEntities,

            recommendation:
                severity === "HIGH"
                    ? "Escalate to human analyst"
                    : "Continue monitoring"
        };

        investigatedCases.push({
            ...transaction,
            investigation: investigation
        });
    }

    return {
        agent: "Investigator Agent",

        investigated: investigatedCases.length,

        cases: investigatedCases
    };
}

module.exports = investigatorAgent;
