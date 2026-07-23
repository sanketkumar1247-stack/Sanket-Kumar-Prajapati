import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets and styles directly from root directory
app.use(express.static(__dirname));

// Serve index.html as the primary landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Explicit handling for missing trailing file extensions or custom routing
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  if (!page.endsWith(".html")) {
    const filePath = path.join(__dirname, `${page}.html`);
    // Attempt to send the HTML file if it exists, otherwise pass to next middleware
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

// Error handling or fallback page (can serve index.html or simple 404)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
