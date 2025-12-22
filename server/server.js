// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = 5051;

// app.use(cors());
// app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const DATA_PATH = path.join(__dirname, "clients.json");
// console.log("DATA_PATH:", DATA_PATH);
// function readClients() {
//   try {
//     if (!fs.existsSync(DATA_PATH)) return [];
//     const raw = fs.readFileSync(DATA_PATH, "utf-8").trim();
//     if (!raw) return [];
//     const parsed = JSON.parse(raw);
//     if (Array.isArray(parsed)) return parsed;
//     if (parsed && Array.isArray(parsed.clients)) return parsed.clients;

//     const keys = Object.keys(parsed)
//       .filter((k) => !isNaN(k))
//       .sort((a, b) => a - b);
//     if (keys.length) return keys.map((k) => parsed[k]);

//     return [];
//   } catch (err) {
//     console.error("readClients error:", err);
//     return [];
//   }
// }

// function writeClients(clients) {
//   try {
//     fs.writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2), "utf-8");
//   } catch (err) {
//     console.error("writeClients error:", err);
//     throw err;
//   }
// }

// app.get("/clients", (req, res) => {
//   const clients = readClients();
//   res.json(clients);
// });

// app.post("/clients", (req, res) => {
//   try {
//     const newClient = req.body;
//     if (!newClient || typeof newClient !== "object") {
//       return res.status(400).json({ error: "Expected client object in body" });
//     }

//     const clients = readClients();
//     const maxId = clients.length
//       ? Math.max(...clients.map((c) => Number(c.id) || 0))
//       : 0;
//     const nextId = maxId + 1;

//     const savedClient = {
//       ...newClient,
//       id: nextId,
//       orders: newClient.orders ?? [],
//     };
//     clients.push(savedClient);
//     writeClients(clients);

//     res.status(201).json(savedClient);
//   } catch (err) {
//     console.error("POST /clients error:", err);
//     res.status(500).json({ error: "Error saving client" });
//   }
// });

// app.delete("/clients", (req, res) => {
//   try {
//     writeClients([]);
//     res.json({ message: "All clients deleted" });
//   } catch (err) {
//     console.error("DELETE /clients error:", err);
//     res.status(500).json({ error: "Cannot delete clients" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
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
// const ORDERS_PATH = path.join(__dirname, "orders.json");

// function readOrders() {
//   try {
//     if (!fs.existsSync(ORDERS_PATH)) return [];
//     const raw = fs.readFileSync(ORDERS_PATH, "utf-8").trim();
//     return raw ? JSON.parse(raw) : [];
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// function writeOrders(orders) {
//   fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf-8");
// }

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
  const clients = readClients();
  res.json(clients);
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

// app.get("/orders", (req, res) => {
//   const orders = readOrders();
//   res.json(orders);
// });

// app.post("/orders", (req, res) => {
//   const newOrder = req.body;
//   if (!newOrder || typeof newOrder !== "object") {
//     return res.status(400).json({ error: "Order object expected" });
//   }

//   const orders = readOrders();
//   const maxId = orders.length ? Math.max(...orders.map((o) => o.id || 0)) : 0;

//   const savedOrder = {
//     ...newOrder,
//     id: maxId + 1,
//     createdAt: newOrder.createdAt || new Date().toISOString(),
//   };

//   orders.push(savedOrder);
//   writeOrders(orders);

//   res.status(201).json(savedOrder);
// });

// app.delete("/orders/:id", (req, res) => {
//   const id = Number(req.params.id);
//   let orders = readOrders();
//   orders = orders.filter((o) => o.id !== id);
//   writeOrders(orders);
//   res.json({ message: "Order deleted" });
// });


app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
