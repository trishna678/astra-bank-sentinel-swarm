# Astra Bank — Sentinel Swarm

Full-stack hackathon demo combining a banking portal, multi-agent fraud investigation workflow, RAG knowledge base, privacy-preserving Risk Passport, and a human-in-the-loop decision gate.

## Architecture
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
