# First Pipeline Challenge

[![CI/CD Pipeline](https://github.com/PalmChas/M4K-Pipeline/actions/workflows/pipeline.yml/badge.svg)](https://github.com/PalmChas/M4K-Pipeline/actions/workflows/pipeline.yml)

Live deployment: [m4k-pipeline-production.up.railway.app](https://m4k-pipeline-production.up.railway.app)

## About
Week 4 Boiler Room Hackathon - Building a complete CI/CD pipeline.

## Architecture
```text
Code Push -> GitHub Actions -> Tests -> Docker Build -> Trivy Scan -> Deploy
```

## Status
- All tests passing
- Security scan complete
- Deployed to production
