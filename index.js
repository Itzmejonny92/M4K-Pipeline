const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "first-pipeline",
    healthy: true,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get("/secret", (req, res) => {
  res.json({
    message: "You found the secret! Here's a cookie.",
    code: "OPERATION-PIPELINE"
  });
});

app.get("/coffee", (req, res) => {
  res.type("text/plain").send(`
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'
`);
});

app.get("/", (req, res) => {
  const now = new Date().toISOString();
  const host = req.get("host");
  const baseUrl = `${req.protocol}://${host}`;
  const repoUrl = "https://github.com/PalmChas/M4K-Pipeline";
  const deployUrl = "https://m4k-pipeline-production.up.railway.app";

  res.type("html").send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>First Pipeline Challenge</title>
        <style>
          :root {
            color-scheme: light;
          }
          body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(120deg, #f8fbff, #eef4ff);
            color: #0f172a;
          }
          .wrap {
            max-width: 980px;
            margin: 36px auto;
            padding: 24px;
            background: #ffffff;
            border: 1px solid #dbe4ff;
            border-radius: 14px;
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          }
          h1 {
            margin-top: 0;
            font-size: 1.9rem;
          }
          .meta {
            color: #334155;
            margin-bottom: 20px;
          }
          .subtitle {
            margin-top: 0;
            margin-bottom: 18px;
            color: #334155;
          }
          .ok {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            background: #dcfce7;
            color: #166534;
            font-weight: 600;
            margin-bottom: 16px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
            gap: 12px;
          }
          .card {
            border: 1px solid #dbe4ff;
            border-radius: 12px;
            padding: 14px;
            background: #f8faff;
          }
          .card h2 {
            margin: 0 0 10px;
            font-size: 1.1rem;
          }
          .list {
            margin: 0;
            padding-left: 18px;
          }
          .list li {
            margin: 6px 0;
          }
          .checklist {
            list-style: none;
            padding-left: 0;
            margin: 0;
          }
          .checklist li {
            margin: 7px 0;
            padding-left: 4px;
          }
          .badge {
            display: inline-block;
            font-size: 0.82rem;
            color: #1e3a8a;
            background: #dbeafe;
            border-radius: 999px;
            padding: 3px 8px;
            margin-bottom: 10px;
          }
          .small {
            color: #475569;
            font-size: 0.92rem;
          }
          ul {
            padding-left: 20px;
          }
          a {
            color: #1d4ed8;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <main class="wrap">
          <span class="ok">Pipeline app is running</span>
          <h1>First Pipeline Challenge - Week 4</h1>
          <p class="subtitle">Mission dashboard for challenge progress, endpoints and secrets.</p>
          <p class="meta">Server time: <code>${now}</code></p>

          <section class="grid">
            <article class="card">
              <span class="badge">Core Links</span>
              <h2>Project</h2>
              <ul class="list">
                <li><a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub Repository</a></li>
                <li><a href="${deployUrl}" target="_blank" rel="noreferrer">Live Deployment</a></li>
                <li><a href="${repoUrl}/blob/main/mission_challenges_checklist.txt" target="_blank" rel="noreferrer">Full Challenge Checklist</a></li>
              </ul>
            </article>

            <article class="card">
              <span class="badge">Verification Endpoints</span>
              <h2>Health and Status</h2>
              <ul class="list">
                <li><a href="${baseUrl}/status">${baseUrl}/status</a></li>
                <li><a href="${baseUrl}/health">${baseUrl}/health</a></li>
              </ul>
            </article>

            <article class="card">
              <span class="badge">Secret Endpoints</span>
              <h2>Bonus Challenges</h2>
              <ul class="list">
                <li><a href="${baseUrl}/secret">${baseUrl}/secret</a></li>
                <li><a href="${baseUrl}/coffee">${baseUrl}/coffee</a></li>
              </ul>
            </article>
          </section>

          <section class="card" style="margin-top: 12px;">
            <span class="badge">Mission Progress</span>
            <h2>Challenge Checklist Snapshot</h2>
            <ul class="checklist">
              <li>[x] Workflow runs on push and PR</li>
              <li>[x] Automated tests in CI</li>
              <li>[x] Docker build in CI</li>
              <li>[x] Trivy security scan</li>
              <li>[x] Live deployment on Railway</li>
              <li>[x] CI badge in README</li>
              <li>[x] Secret challenge endpoints</li>
              <li>[x] Pipeline ASCII art output</li>
            </ul>
            <p class="small">Detailed checklist is tracked in <code>mission_challenges_checklist.txt</code>.</p>
          </section>
        </main>
      </body>
    </html>
  `);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
