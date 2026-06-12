import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Item } from "../shared/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data", "items.json");

const app = express();
app.use(cors());
app.use(express.json());

const items: Item[] = JSON.parse(await readFile(DATA_PATH, "utf-8"));

// GET /list?category=&search=&status=
// All query params are optional strings. Results are filtered by:
//   - search:   case-insensitive substring match on name or description
//   - category: exact (case-insensitive) match on category
//   - status:   exact (case-insensitive) match on status
app.get("/list", (req, res) => {
  const search = String(req.query.search ?? "").trim().toLowerCase();
  const category = String(req.query.category ?? "").trim().toLowerCase();
  const status = String(req.query.status ?? "").trim().toLowerCase();

  const results = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);
    const matchesCategory = !category || item.category.toLowerCase() === category;
    const matchesStatus = !status || item.status.toLowerCase() === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  res.json(results);
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
