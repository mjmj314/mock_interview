import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data", "products.json");

const app = express();
app.use(cors());
app.use(express.json());

// Seed data is loaded into memory at startup. The list resets on restart,
// which keeps the seed intact for repeated practice runs.
let products = JSON.parse(await readFile(DATA_PATH, "utf-8"));

// GET /products -> returns the full products list
app.get("/products", (req, res) => {
  res.json(products);
});

// DELETE /products/:id -> removes the product with the given id
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ error: `Product ${id} not found` });
  }

  products = products.filter((p) => p.id !== id);
  res.json({ removed: id });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
