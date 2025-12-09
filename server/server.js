// server/server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5051;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "clients.json");

function readClients() {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading clients.json:", err);
    return [];
  }
}
function writeClients(clients) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2), "utf-8");
}

app.get("/clients", (req, res) => {
  const clients = readClients();
  res.json(clients);
});

app.post("/clients", (req, res) => {
  try {
    const newClient = req.body;
    if (!newClient || typeof newClient !== "object") {
      return res.status(400).json({ error: "Expected client object in body" });
    }

    const clients = readClients();
    const maxId = clients.length
      ? Math.max(...clients.map((c) => Number(c.id) || 0))
      : 0;
    const nextId = maxId + 1;

    const savedClient = {
      ...newClient,
      id: nextId,
      orders: newClient.orders ?? [],
    };

    clients.push(savedClient);
    writeClients(clients);
    res.status(201).json(savedClient);
  } catch (err) {
    console.error("Error in POST /clients:", err);
    res.status(500).json({ error: "Error saving client" });
  }
});

app.delete("/clients", (req, res) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify([]), "utf-8");
    res.status(200).json({ message: "All clients deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot delete clients" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
