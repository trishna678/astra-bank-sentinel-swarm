// Agent Orchestrator: tool-using, evidence-driven investigation workflow.
// This remains a deterministic prototype, not an LLM-powered autonomous system.
// It preserves the existing API response fields and adds transparent tool-call details.

const scoutAgent = require("./scoutAgent");
const investigatorAgent = require("./investigatorAgent");
const caseWriterAgent = require("./caseWriterAgent");

function getRelatedTransactions(target, allTransactions) {
    // Tool 1: retrieve related records using shared device or beneficiary.
    return allTransactions.filter((tx) => {
        if (tx.id === target.id) return false;
        return (
            (target.device && tx.device === target.device) ||
            (target.beneficiary && tx.beneficiary === target.beneficiary)
        );
    }).slice(0, 8);
}

function summarizeEvidence(target, related) {
    // Tool 2: turn retrieved records into explicit, auditable evidence.
    const sharedDeviceCount = related.filter(
        (tx) => target.device && tx.device === target.device
    ).length;
    const sharedBeneficiaryCount = related.filter(
        (tx) => target.beneficiary && tx.beneficiary === target.beneficiary
    ).length;

    return {
        relatedRecordCount: related.length,
        sharedDeviceCount,
        sharedBeneficiaryCount,
        corroborated: related.length > 0,
        evidenceNote: related.length
            ? `Found ${related.length} related record(s): ${sharedDeviceCount} share the device and ${sharedBeneficiaryCount} share the beneficiary.`
            : "No related records found in the available synthetic dataset."
    };
}

function chooseNextAction(score, evidence) {
    // Explicit decision policy: evidence changes the recommended next step.
    if (score >= 80 && evidence.corroborated) {
        return "escalate_for_human_review";
    }
    if (score >= 80 && !evidence.corroborated) {
        return "request_human_review_with_limited_evidence";
    }
    if (score >= 45 && evidence.corroborated) {
        return "continue_investigation_and_review";
    }
    return "monitor";
}

function runAgenticSwarm(transactions) {
    const startedAt = new Date().toISOString();
    const toolCalls = [];
    const trace = [];

    // STEP 1: Scout screens the supplied transaction dataset.
    const scoutResult = scoutAgent(transactions);
    trace.push({
        step: 1,
        agent: "Scout Agent",
        status: "completed",
        action: "Screen transactions and flag risk signals",
        result: `${scoutResult.flagged} suspicious transaction(s) identified from ${transactions.length} records.`
    });

    // STEP 2: Investigator calls retrieval and evidence-summary tools.
    const enrichedCandidates = scoutResult.transactions.map((tx) => {
        const related = getRelatedTransactions(tx, transactions);
        toolCalls.push({
            tool: "getRelatedTransactions",
            input: { transactionId: tx.id, device: tx.device, beneficiary: tx.beneficiary },
            output: { recordsReturned: related.length }
        });

        const evidence = summarizeEvidence(tx, related);
        toolCalls.push({
            tool: "summarizeEvidence",
            input: { transactionId: tx.id, relatedRecordCount: related.length },
            output: evidence
        });

        const nextAction = chooseNextAction(tx.score, evidence);
        return {
            ...tx,
            relatedTransactions: related,
            evidenceSummary: evidence,
            nextAction
        };
    });

    const investigatorResult = investigatorAgent(enrichedCandidates);
    trace.push({
        step: 2,
        agent: "Investigator Agent",
        status: "completed",
        action: "Retrieve related records and correlate evidence",
        result: `${investigatorResult.investigated} case(s) investigated; ${toolCalls.length} tool call(s) executed.`
    });

    // STEP 3: Case Writer creates the report and records the chosen next step.
    const caseWriterResult = caseWriterAgent(investigatorResult.cases);
    const cases = caseWriterResult.reports.map((item) => {
        const evidence = item.evidenceSummary || {
            relatedRecordCount: 0,
            sharedDeviceCount: 0,
            sharedBeneficiaryCount: 0,
            corroborated: false,
            evidenceNote: "No related-record evidence attached."
        };
        return {
            ...item,
            caseReport: {
                ...item.caseReport,
                relatedEvidence: evidence,
                nextAction: item.nextAction || "request_human_review_with_limited_evidence",
                decisionRationale:
                    `${item.investigation.severity} risk was based on ${item.signals ? item.signals.length : 0} risk signal(s). ` +
                    evidence.evidenceNote +
                    " This is a synthetic-data recommendation and requires human review."
            }
        };
    });

    trace.push({
        step: 3,
        agent: "Case Writer Agent",
        status: "completed",
        action: "Generate evidence-backed case reports",
        result: `${cases.length} report(s) generated with risk reasons and related-record evidence.`
    });
    trace.push({
        step: 4,
        agent: "Human Analyst",
        status: "waiting",
        action: "Review recommendation and decide",
        result: "No account action is taken by the agent workflow; an authorized analyst must decide."
    });

    return {
        rowsScanned: transactions.length,
        scouted: scoutResult.flagged,
        investigated: investigatorResult.investigated,
        reportsGenerated: caseWriterResult.reportsGenerated,
        agents: [
            {
                name: "Scout Agent",
                status: "completed",
                responsibility: "Screen synthetic transactions and detect risk signals"
            },
            {
                name: "Investigator Agent",
                status: "completed",
                responsibility: "Use retrieval tools to correlate device and beneficiary evidence"
            },
            {
                name: "Case Writer Agent",
                status: "completed",
                responsibility: "Generate an auditable report with rationale and next-step recommendation"
            },
            {
                name: "Human Analyst",
                status: "waiting",
                responsibility: "Make the final freeze, release, or escalation decision"
            }
        ],
        trace,
        toolCalls,
        decisionSummary: {
            startedAt,
            completedAt: new Date().toISOString(),
            loopDescription: "Goal → screen → retrieve evidence → observe results → select next action → report → human review",
            autonomousAccountActions: false
        },
        cases
    };
}

module.exports = runAgenticSwarm;
