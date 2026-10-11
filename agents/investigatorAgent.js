// Investigator Agent
// Investigates suspicious transactions and correlates risk evidence.

function investigatorAgent(flaggedTransactions) {
    const investigatedCases = [];

    const transactions = Array.isArray(flaggedTransactions)
        ? flaggedTransactions
        : [];

    // Build relationship data to identify reused devices and beneficiaries.
    const deviceCounts = {};
    const beneficiaryCounts = {};

    for (const tx of transactions) {
        if (tx.device) {
            deviceCounts[tx.device] =
                (deviceCounts[tx.device] || 0) + 1;
        }

        if (tx.beneficiary) {
            beneficiaryCounts[tx.beneficiary] =
                (beneficiaryCounts[tx.beneficiary] || 0) + 1;
        }
    }

    for (const transaction of transactions) {
        const score = Number(transaction.score) || 0;
        const signals = Array.isArray(transaction.signals)
            ? transaction.signals
            : [];

        const linkedEntities = [];
        const evidence = [];
        const nextActions = [];

        const deviceReuse = Number(transaction.deviceReuse) || 0;
        const sharedDeviceCount = transaction.device
            ? deviceCounts[transaction.device]
            : 0;

        const beneficiaryCount = transaction.beneficiary
            ? beneficiaryCounts[transaction.beneficiary]
            : 0;

        if (deviceReuse >= 3 || sharedDeviceCount >= 3) {
            linkedEntities.push("Shared device");
            linkedEntities.push("Potentially linked accounts");

            evidence.push({
                type: "DEVICE_REUSE",
                strength: "MEDIUM",
                detail: "Device appears across multiple flagged transactions."
            });

            nextActions.push("Review accounts using this device");
        }

        if (transaction.newBeneficiary) {
            linkedEntities.push("New beneficiary");

            evidence.push({
                type: "NEW_BENEFICIARY",
                strength: "MEDIUM",
                detail: "The transaction involves a beneficiary marked as new."
            });

            nextActions.push("Verify beneficiary and payment context");
        }

        if (beneficiaryCount >= 2) {
            linkedEntities.push("Repeated beneficiary");

            evidence.push({
                type: "BENEFICIARY_PATTERN",
                strength: "MEDIUM",
                detail: "The beneficiary appears in multiple flagged transactions."
            });

            nextActions.push("Check whether related transfers have a legitimate explanation");
        }

        for (const signal of signals) {
            evidence.push({
                type: "TRANSACTION_SIGNAL",
                strength: "REVIEW",
                detail: String(signal)
            });
        }

        if (score >= 80) {
            nextActions.push("Prioritize human analyst review");
        } else if (score >= 60) {
            nextActions.push("Request additional verification");
        } else {
            nextActions.push("Continue monitoring and gather context");
        }

        const severity = score >= 80
            ? "HIGH"
            : score >= 60
                ? "MEDIUM"
                : "LOW";

        const investigation = {
            severity,
            transactionId: transaction.id,
            amount: transaction.amount,
            device: transaction.device,
            location: transaction.city,
            beneficiary: transaction.beneficiary,
            riskScore: score,
            suspiciousSignals: signals,
            linkedEntities: [...new Set(linkedEntities)],
            evidence,
            nextActions: [...new Set(nextActions)],
            recommendation: severity === "HIGH"
                ? "Escalate to human analyst; do not automatically freeze the account."
                : severity === "MEDIUM"
                    ? "Request additional verification and review the evidence."
                    : "Continue monitoring; no automatic enforcement.",
            decisionReason: evidence.length > 0
                ? "Review is recommended because one or more risk indicators were identified."
                : "The risk score determines the review priority; additional evidence may be needed.",
            requiresHumanReview: severity === "HIGH" || severity === "MEDIUM"
        };

        investigatedCases.push({
            ...transaction,
            investigation
        });
    }

    return {
        agent: "Investigator Agent",
        investigated: investigatedCases.length,
        cases: investigatedCases,
        summary: {
            highRisk: investigatedCases.filter(
                item => item.investigation.severity === "HIGH"
            ).length,
            mediumRisk: investigatedCases.filter(
                item => item.investigation.severity === "MEDIUM"
            ).length,
            lowRisk: investigatedCases.filter(
                item => item.investigation.severity === "LOW"
            ).length
        }
    };
}

module.exports = investigatorAgent;
