

import puppeteer from "puppeteer";
import { marked } from "marked";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    const notesHTML = marked(result.notes || "");

   
    let extractedTitle = "Notium Notes";

    const match = result.notes?.match(/#\s*(.*)/);
    if (match && match[1]) {
      extractedTitle = match[1];
    } else {
      extractedTitle = result.subTopics
        ? Object.values(result.subTopics)[0]?.[0] || "Notium Notes"
        : "Notium Notes";
    }

    const html = `
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          padding: 40px;
          color: #111827;
          line-height: 1.6;
        }

        h1 {
          text-align: center;
          font-size: 26px;
          font-weight: bold;
          color: #4f46e5;
          margin-bottom: 10px;
        }

        h2 {
          color: #4f46e5;
          margin-top: 25px;
        }

        .section {
          margin-bottom: 20px;
        }

        ul {
          padding-left: 20px;
        }

        .badge {
          text-align: center;
          color: gray;
          margin-bottom: 20px;
        }

        .divider {
          border-top: 1px solid #e5e7eb;
          margin: 20px 0;
        }

        .box {
          background: #f9fafb;
          padding: 15px;
          border-radius: 10px;
          margin-top: 10px;
        }
      </style>
    </head>

    <body>

      <!-- Dynamic Heading -->
      <h1>${extractedTitle}</h1>
      <div class="badge">Importance: ${result.importance}</div>
      <div class="divider"></div>

      <!-- Sub Topics -->
      <div class="section">
        <h2>⭐ Sub Topics</h2>
        ${Object.entries(result.subTopics || {})
          .map(
            ([star, topics]) => `
            <div class="box">
              <b>${star} Topics:</b>
              <ul>
                ${(topics || []).map((t) => `<li>${t}</li>`).join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>

      <!-- Notes -->
      <div class="section">
        <h2>📝 Notes</h2>
        <div class="box">
          ${notesHTML}
        </div>
      </div>

      <!-- Revision -->
      <div class="section">
        <h2>⚡ Revision Points</h2>
        <div class="box">
          <ul>
            ${(result.revisionPoints || [])
              .map((p) => `<li>${p}</li>`)
              .join("")}
          </ul>
        </div>
      </div>

      <!-- Questions -->
      <div class="section">
        <h2>❓ Important Questions</h2>

        <div class="box">
          <b>Short Questions:</b>
          <ul>
            ${(result.questions?.short || [])
              .map((q) => `<li>${q}</li>`)
              .join("")}
          </ul>
        </div>

        <div class="box">
          <b>Long Questions:</b>
          <ul>
            ${(result.questions?.long || [])
              .map((q) => `<li>${q}</li>`)
              .join("")}
          </ul>
        </div>

        <div class="box">
          <b>Diagram Question:</b>
          <p>${result.questions?.diagram || ""}</p>
        </div>

      </div>

    </body>
    </html>
    `;

   
const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // ✅ REQUIRED
});
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Notium_Notes.pdf",
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "PDF generation failed" });
  }
};