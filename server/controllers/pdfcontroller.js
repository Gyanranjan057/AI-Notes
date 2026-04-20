 
 import PDFDocument from "pdfkit";
 
export const pdfDownload = async (req, res) => {
    const { result } = req.body;

    if (!result) {
        return res.status(400).json({ error: "No content provided" });
    }

    const doc = new PDFDocument({ margin: 50 });
    doc.font("Helvetica");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ExamNotesAI.pdf"');
    doc.pipe(res);

    let extractedTitle = "ExamNotes AI";
    const match = result.notes?.match(/#\s*(.*)/);
    if (match && match[1]) {
        extractedTitle = match[1];
    }

    doc.fontSize(20).text(extractedTitle, { align: "center" });
    doc.moveDown();

    let importanceText = "";

    if (result.importance === "⭐") importanceText = "Low";
    else if (result.importance === "⭐⭐") importanceText = "Medium";
    else if (result.importance === "⭐⭐⭐") importanceText = "High";

    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);

    Object.entries(result.subTopics).forEach(([star, topics]) => {
        let label = "";

        if (star === "⭐") label = "Low Priority";
        else if (star === "⭐⭐") label = "Medium Priority";
        else if (star === "⭐⭐⭐") label = "High Priority";

        doc.moveDown(0.5);
        doc.fontSize(13).text(`${label}:`);

        topics.forEach((t) => {
            doc.fontSize(12).text(`• ${t}`);
        });
    });

    doc.moveDown();

    // Notes ....................
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);
  const lines = result.notes.split("\n");
  lines.forEach((line) => {
  const trimmed = line.trim();

  if (trimmed.startsWith("## ")) {
    const heading = trimmed.replace(/^##\s*/, "");
    doc.moveDown(0.5);
    doc.fontSize(13).font("Helvetica-Bold").text(heading);
    doc.font("Helvetica");
  } else if (trimmed.startsWith("# ")) {

    const heading = trimmed.replace(/^#\s*/, "");
    doc.moveDown(0.5);
    doc.fontSize(14).font("Helvetica-Bold").text(heading);
    doc.font("Helvetica");
  } else if (trimmed !== "") {


    doc.fontSize(12).text(trimmed.replace(/[*]/g, ""));
  } else {
    doc.moveDown(0.3);
  }
});

    doc.moveDown();

    doc.fontSize(16).text("Revision Points");
    doc.moveDown(0.5);
    result.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`• ${p}`);
    });

    doc.moveDown();

    doc.fontSize(16).text("Important Questions");
    doc.moveDown(0.5);

    doc.fontSize(13).text("Short Questions:");
    result.questions.short.forEach((q) => {
        doc.fontSize(12).text(`• ${q}`);
    });

    doc.moveDown(0.5);
    doc.fontSize(13).text("Long Questions:");
    result.questions.long.forEach((q) => {
        doc.fontSize(12).text(`• ${q}`);
    });

    doc.moveDown(0.5);
    doc.fontSize(13).text("Diagram Question:");
    doc.fontSize(12).text(result.questions.diagram);

    doc.end();
};



