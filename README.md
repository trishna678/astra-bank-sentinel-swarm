# 🛡️ Astra Bank Sentinel Swarm
> **Autonomous Multi-Agent Fraud Investigation & Privacy-Preserving Banking Security**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-brightgreen?style=for-the-badge&logo=render)](https://astra-bank-sentinel-swarm.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/trishna678/astra-bank-sentinel-swarm)

---

## 📌 Executive Summary

**Astra Bank Sentinel Swarm** is an agentic banking security platform built to detect, investigate, and mitigate complex financial fraud in real time. 

Traditional fraud systems rely on static rule engines or basic notification alerts that flood human analysts with false positives. Sentinel Swarm deploys an autonomous **multi-agent loop** where specialized AI roles observe transaction telemetry, dynamically execute investigation tools, synthesize contextual evidence, and generate clear decision briefs for human review—all while demonstrating a privacy-first **Zero-Knowledge (ZK) Risk Passport concept**.

---

## 🤖 What Makes It Agentic? (The Agent Loop)

Instead of a single linear pipeline or a standard chatbot, Sentinel Swarm executes a dynamic **Goal → Decide → Tool Use → Observe → Deliver** loop:



Full-stack hackathon demo combining a banking portal, multi-agent fraud investigation workflow, RAG knowledge base, privacy-preserving Risk Passport, and a human-in-the-loop decision gate.

### Specialized Multi-Agent Roles

1. **Scout Agent:** Continuously scans transaction streams. Identifies anomalies (velocity spikes, geographic distance mismatches, novel beneficiaries) and decides whether to dismiss or trigger deep investigation.
2. **Investigator Agent:** Formulates a dynamic plan. Invokes specific backend diagnostic tools (`checkIpLocation`, `calculateVelocityScore`, vector context searches) to gather evidence.
3. **Case Writer Agent:** Synthesizes raw tool telemetry into a human-readable risk brief with clear behavioral flags and recommended actions.
4. **Human Analyst (Human-in-the-Loop):** Maintains complete control through an interactive management console, reviewing full agent reasoning logs before executing freeze or pass orders.

---

## 🔒 Zero-Knowledge Risk Passport Concept

To solve the privacy dilemma in digital banking, Sentinel Swarm introduces the **Zero-Knowledge (ZK) Risk Passport** concept:
* Allows institutions to verify risk states (e.g., `Risk Score < 0.20` or `Identity Age Verified`) across banking entities.
* Minimizes unnecessary exposure of sensitive personally identifiable information (PII) during multi-agent investigations or cross-institution verification.

---


## 🚀 Getting Started Locally

### Prerequisites
* Web browser (Chrome, Firefox, Edge, Safari)
* Node.js / Local HTTP Server (optional)

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/trishna678/astra-bank-sentinel-swarm.git](https://github.com/trishna678/astra-bank-sentinel-swarm.git)
   cd astra-bank-sentinel-swarm
   

## Architecture 🛠️ Built With

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Modern Dashboard Design
* **Agent Architecture:** Multi-Agent Hand-off Protocol, Tool-Calling Orchestrators, Real-time Reasoning Logs
* **Deployment:** Render (`astra-bank-sentinel-swarm.onrender.com`)
* **Data:** Synthetic High-Frequency Banking Telemetry Engine

---
- Frontend: Astra Bank HTML/CSS/JS portal, extended with a Sentinel Control Room, Privacy Risk Passport, RAG search, and a direct-file demo mode.
- Backend: Node.js HTTP REST API (zero external npm dependencies).
- Agents: Scout Agent → Investigator Agent → Case Writer Agent → Human Analyst decision gate.
- RAG: small local fraud/security knowledge base exposed through `/api/rag/search`.
- Evaluation: deterministic 1,000-row synthetic transaction run with planted anomaly patterns and a benign control case.
- Privacy: SHA-256 commitment-based passport prototype. It is intentionally described as a prototype, not a formal ZK-SNARK/PLONK system.
  

## Run locally
1. Install Node.js 18+. No npm packages are required.
2. In this folder run:
   ```bash
   npm start
   ```
   On Windows you can also double-click `start.bat`.
3. Open `http://localhost:3000`.

### If you double-click `public/index.html`
The frontend now includes a safe **demo/offline adapter**. The login and Sentinel demo flow still work without a running backend, so the browser will no longer show “Failed to fetch”. For the full backend/API demonstration, use `npm start` or `start.bat`.

## Demo credentials
Analyst:
- Username: `admin`
- Password: `admin123`

Member:
- Username: `astra10001`
- Password: `pass10001`

Additional generated demo customers use `astra10002` … `astra11000` with matching passwords `pass10002` … `pass11000`.

## Hackathon demo path
1. Login as analyst.
2. Open **Sentinel Control Room**.
3. Click **Run full swarm** and show the four-stage trace.
4. Explain that only selected anomalies are escalated and the human remains the final decision maker.
5. Search the RAG knowledge base for “mule account” or “account takeover”.
6. Open **Privacy Risk Passport**, create a commitment, then verify it.
7. Freeze/release a case and show the action is sent to the backend.

## API
- `POST /api/auth/analyst`
- `POST /api/auth/member`
- `POST /api/swarm/run`
- `GET /api/cases`
- `POST /api/cases/:id/action`
- `POST /api/rag/search`
- `POST /api/passport/create`
- `POST /api/passport/verify`
- `GET /api/health`

## Production note
This is a hackathon/demo application. It uses synthetic data and in-memory sessions; do not use the supplied credentials or mock data for a real bank system. A production deployment should add a real database, secure password hashing/identity provider, HTTPS, CSRF protection, audit storage, rate limiting, secret management, and a formal ZK proof circuit if formal zero-knowledge guarantees are required.
