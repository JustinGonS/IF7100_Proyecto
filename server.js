// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const admin = require("firebase-admin");

// Inicializar Firebase
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Guardar cotización
app.post("/cotizaciones", async (req, res) => {
  try {
    const nuevaCotizacion = await db.collection("cotizaciones").add(req.body);
    res.status(201).json({ id: nuevaCotizacion.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener cotizaciones
app.get("/cotizaciones", async (req, res) => {
  try {
    const snapshot = await db.collection("cotizaciones").get();
    const cotizaciones = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat en tiempo real
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("mensaje", (data) => {
    io.emit("mensaje", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));