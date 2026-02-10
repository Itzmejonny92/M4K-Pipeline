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

app.get("/", (req, res) => {
  const now = new Date().toISOString();
  const host = req.get("host");
  const baseUrl = `${req.protocol}://${host}`;

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
            max-width: 760px;
            margin: 48px auto;
            padding: 28px;
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
          .ok {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            background: #dcfce7;
            color: #166534;
            font-weight: 600;
            margin-bottom: 16px;
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
          <p class="meta">Server time: <code>${now}</code></p>
          <p>Use these endpoints to verify deploy and monitoring:</p>
          <ul>
            <li><a href="${baseUrl}/status">${baseUrl}/status</a></li>
            <li><a href="${baseUrl}/health">${baseUrl}/health</a></li>
          </ul>
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
