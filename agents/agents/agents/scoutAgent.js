// Scout Agent
// Responsible for detecting suspicious transaction patterns

function scoutAgent(transactions) {
    const flagged = [];

    for (const transaction of transactions) {
        let score = 0;
        const signals = [];

        if (transaction.amount >= 75000) {
            score += 28;
            signals.push("High-value transfer");
        }

        if (transaction.hour < 5 || transaction.hour >= 23) {
            score += 25;
            signals.push("Odd-hour activity");
        }

        if (transaction.newBeneficiary) {
            score += 20;
            signals.push("New beneficiary");
        }

        if (transaction.deviceReuse >= 3) {
            score += 30;
            signals.push("Device reused across accounts");
        }

        if (transaction.velocity >= 5) {
            score += 22;
            signals.push("Velocity spike");
        }

        if (score >= 45) {
            flagged.push({
                ...transaction,
                score,
                signals
            });
        }
    }

    return {
        agent: "Scout Agent",
        scanned: transactions.length,
        flagged: flagged.length,
        transactions: flagged
    };
}

module.exports = scoutAgent;
