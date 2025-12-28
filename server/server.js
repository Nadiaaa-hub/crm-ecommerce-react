import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { orders } from "./dataOrders/dataOrders.js";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.set("etag", false);

const PORT = 5051;

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "clients.json");

function readClients() {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, "utf-8").trim();
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeClients(clients) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2), "utf-8");
}

app.get("/clients", (req, res) => {
  res.set("Cache-Control", "no-store");
  const clients = readClients();
  res.json(clients);
});

app.get("/orders", (req, res) => {
  res.set("Cache-Control", "no-store"); 
  res.json(orders);
});

app.post("/clients", (req, res) => {
  const newClient = req.body;
  if (!newClient || typeof newClient !== "object") {
    return res.status(400).json({ error: "Client object expected" });
  }

  const clients = readClients();
  const maxId = clients.length ? Math.max(...clients.map((c) => c.id || 0)) : 0;
  const savedClient = {
    ...newClient,
    id: maxId + 1,
    orders: newClient.orders || [],
  };

  clients.push(savedClient);
  writeClients(clients);

  res.status(201).json(savedClient);
});

app.delete("/clients/:id", (req, res) => {
  const id = Number(req.params.id);
  let clients = readClients();
  clients = clients.filter((c) => c.id !== id);
  writeClients(clients);
  res.json({ message: "Client deleted" });
});

<<<<<<< HEAD
=======

>>>>>>> 9efa35f713f230dd9604c6cc634ddd0ae0c31b1f
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
