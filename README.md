# First Pipeline Challenge

[![CI/CD Pipeline](https://github.com/PalmChas/M4K-Pipeline/actions/workflows/pipeline.yml/badge.svg)](https://github.com/PalmChas/M4K-Pipeline/actions/workflows/pipeline.yml)

```text
 __  __ _  _  _       ____  _            _ _            
|  \/  | || || |     |  _ \(_)_ __   ___| (_)_ __   ___ 
| |\/| | || || |_    | |_) | | '_ \ / _ \ | | '_ \ / _ \
| |  | |__   _|__|   |  __/| | |_) |  __/ | | | | |  __/
|_|  |_|  |_|        |_|   |_| .__/ \___|_|_|_| |_|\___|
                             |_|                         
```

Live deployment: [m4k-pipeline-production.up.railway.app](https://m4k-pipeline-production.up.railway.app)

## About
Week 4 Boiler Room Hackathon mission: build a full CI/CD pipeline with tests, Docker image build, Trivy scan and live deployment.

## Architecture
```mermaid
flowchart LR
  A[Code Push / PR] --> B[GitHub Actions]
  B --> C[npm ci]
  C --> D[npm test]
  D --> E[Docker Build]
  E --> F[Trivy Scan]
  F --> G[Deploy Hook]
  G --> H[Railway Production URL]
```

## Endpoints
- `GET /` -> dashboard landing page
- `GET /status` -> service status + timestamp
- `GET /health` -> health check + uptime

## Pipeline Demo GIF
![Pipeline Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWluNnN6dW5va2N1bDh1d2NubTRrMXh2Y2t6aW1wNnFhNXV0a2g4biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/coxQHKASG60HrHtvkt/giphy.gif)

## Team Bios
- 👩‍💻 Driver: Builds app features and keeps commits clean.
- 🧭 Navigator: Owns architecture, docs and delivery flow.
- 🧪 Tester: Breaks assumptions and keeps pipeline green.
- 🔍 Researcher: Investigates errors and optimizes tooling.

## Future Plans
- Add staging and production environments with protected deploys.
- Add Prometheus-style `/metrics` and dashboard graphs.
- Add Slack notifications for failed and successful runs.
- Add chaos test job that randomly restarts the service in staging.

## Trivy Findings (2026-02-10)
Latest local scan report: `trivy-report.txt`

Summary:
- OS packages (alpine): 32 total (CRITICAL: 2, HIGH: 4, MEDIUM: 21, LOW: 5)
- Node.js packages: 7 total (CRITICAL: 0, HIGH: 5, MEDIUM: 0, LOW: 2)

Key findings:
- `libcrypto3` / `libssl3`: `CVE-2025-15467` (CRITICAL), fixed in `3.3.6-r0`
- OpenSSL: `CVE-2025-69419` (HIGH)
- `cross-spawn@7.0.3`: `CVE-2024-21538` (HIGH), fixed in `7.0.5`
- `glob@10.4.2`: `CVE-2025-64756` (HIGH), fixed in `10.5.0` or `11.1.0`

Misconfiguration found earlier:
- `DS-0002`: container ran as root
- Status: fixed by setting `USER node` in `Dockerfile`

## Status
- All tests passing
- Security scan complete
- Deployed to production

<!-- Careful readers only: try the hidden endpoint /secret -->
