// Agent Orchestrator
// Coordinates the Scout, Investigator and Case Writer agents.

const scoutAgent = require("./scoutAgent");
const investigatorAgent = require("./investigatorAgent");
const caseWriterAgent = require("./caseWriterAgent");

function runAgenticSwarm(transactions) {

    // ==============================
    // AGENT 1: SCOUT
    // ==============================

    const scoutResult = scoutAgent(transactions);

    // ==============================
    // AGENT 2: INVESTIGATOR
    // ==============================

    const investigatorResult =
        investigatorAgent(
            scoutResult.transactions
        );

    // ==============================
    // AGENT 3: CASE WRITER
    // ==============================

    const caseWriterResult =
        caseWriterAgent(
            investigatorResult.cases
        );

    // ==============================
    // AGENT TRACE
    // ==============================

    const trace = [

        {
            step: 1,
            agent: "Scout Agent",
            status: "completed",
            action: "Transaction screening",
            result:
                `${scoutResult.flagged} suspicious transactions identified`
        },

        {
            step: 2,
            agent: "Investigator Agent",
            status: "completed",
            action: "Evidence investigation",
            result:
                `${investigatorResult.investigated} cases investigated`
        },

        {
            step: 3,
            agent: "Case Writer Agent",
            status: "completed",
            action: "Case generation",
            result:
                `${caseWriterResult.reportsGenerated} reports generated`
        },

        {
            step: 4,
            agent: "Human Analyst",
            status: "waiting",
            action: "Final decision",
            result:
                "Awaiting human analyst decision"
        }

    ];

    return {

        rowsScanned: transactions.length,

        scouted: scoutResult.flagged,

        investigated:
            investigatorResult.investigated,

        reportsGenerated:
            caseWriterResult.reportsGenerated,

        agents: [

            {
                name: "Scout Agent",
                status: "completed",
                responsibility:
                    "Detect suspicious transaction patterns"
            },

            {
                name: "Investigator Agent",
                status: "completed",
                responsibility:
                    "Investigate and correlate evidence"
            },

            {
                name: "Case Writer Agent",
                status: "completed",
                responsibility:
                    "Generate fraud investigation reports"
            },

            {
                name: "Human Analyst",
                status: "waiting",
                responsibility:
                    "Make final freeze or release decision"
            }

        ],

        trace: trace,

        cases: caseWriterResult.reports

    };
}

module.exports = runAgenticSwarm;
