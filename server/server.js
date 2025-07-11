const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 4000;

app.use(cors());

// Отдача изображений из public
app.use('/images', express.static(path.join(__dirname, "../client/public/images")));

// ✅ API: /products?page=1&limit=9
app.get("/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
      return res.status(500).json({ error: "Failed to load products" });
    }

    const allProducts = JSON.parse(data);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const start = (page - 1) * limit;
    const paginated = allProducts.slice(start, start + limit);

    res.json({
      page,
      total: allProducts.length,
      products: paginated
    });
  });
});

// ✅ API: /collections — получить список всех коллекций
app.get("/collections", (req, res) => {
  const filePath = path.join(__dirname, "collections.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading collections.json:", err);
      return res.status(500).json({ error: "Failed to load collections" });
    }
    const collections = JSON.parse(data);
    res.json(collections);
  });
});

// ✅ API: /collections/:id — получить одну коллекцию по ID
app.get("/collections/:id", (req, res) => {
  const filePath = path.join(__dirname, "collections.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading collections.json:", err);
      return res.status(500).json({ error: "Failed to load collection" });
    }
    const collections = JSON.parse(data);
    const found = collections.find(c => c.id === parseInt(req.params.id));
    if (!found) return res.status(404).json({ error: "Collection not found" });
    res.json(found);
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
