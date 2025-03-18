const functions = require('firebase-functions');
const admin = require('firebase-admin');
const io = require('socket.io')(httpServer); // Para WebSocket

admin.initializeApp();

const db = admin.firestore();

// Función para recibir un mensaje y guardarlo en Firestore
exports.sendMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap, context) => {
    const newMessage = snap.data();
    const messageData = {
      text: newMessage.text,
      sender: newMessage.sender,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Aquí puedes almacenar mensajes en Firestore, si no lo has hecho ya
    await db.collection('messages').add(messageData);
  });

// Configuración de WebSocket
exports.chatWebSocket = functions.https.onRequest((req, res) => {
  const socketServer = require('http').Server(res);
  const io = require('socket.io')(socketServer);
  
  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('chat message', (data) => {
      io.emit('chat message', data); // Reenviar mensaje a todos los clientes
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });

  socketServer.listen(3001, () => {
    console.log("Servidor WebSocket escuchando en el puerto 3001");
  });

  res.status(200).send("WebSocket funcionando");
});
