// Case Writer Agent
// Converts investigation findings into an
// auditable fraud investigation report.

function caseWriterAgent(investigatedCases) {

    const reports = [];

    for (const caseData of investigatedCases) {

        const investigation = caseData.investigation;

        const report = {
            caseId: caseData.id,

            title: "Fraud Investigation Case",

            riskLevel: investigation.severity,

            transaction: {
                amount: caseData.amount,
                location: investigation.location,
                device: investigation.device,
                beneficiary: investigation.beneficiary
            },

            evidence: investigation.suspiciousSignals,

            linkedEntities: investigation.linkedEntities,

            recommendation: investigation.recommendation,

            analystDecisionRequired: true,

            generatedBy: "Case Writer Agent",

            summary:
                `Transaction ${caseData.id} has been classified as ` +
                `${investigation.severity} risk based on ` +
                `${investigation.suspiciousSignals.length} suspicious signals.`
        };

        reports.push({
            ...caseData,
            caseReport: report
        });
    }

    return {
        agent: "Case Writer Agent",

        reportsGenerated: reports.length,

        reports: reports
    };
}

module.exports = caseWriterAgent;
