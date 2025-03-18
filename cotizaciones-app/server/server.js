const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const firebaseAdmin = require("firebase-admin");
const multer = require("multer");
const path = require("path");

// Configuración de Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("./firebase-adminsdk.json")),
  storageBucket: "your-firebase-storage-bucket-url",
});

// Configuración de Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Conexión de WebSocket con Socket.io
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Recibir y emitir mensajes
  socket.on("chat message", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("chat message", data);  // Emitir a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Servir archivos estáticos
app.use(express.static("uploads"));
app.use("/public", express.static(path.join(__dirname, "uploads")));

// Iniciar el servidor
server.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});
