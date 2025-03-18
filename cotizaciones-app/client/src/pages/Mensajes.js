import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";  // Asegúrate de importar 'app' desde 'firebase.js'

// Conexión con Firebase Storage
const storage = getStorage(app);

// Conexión con Socket.io
const socket = io("http://localhost:3001");

const Mensajes = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = async () => {
    const messageData = { message, image: null };

    if (file) {
      const fileRef = ref(storage, "images/" + file.name);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);
      messageData.image = imageUrl;
    }

    socket.emit("chat message", messageData);
    setMessage("");
    setFile(null);
  };

  return (
    <div>
      <h1>Mensajes</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.message}</p>
            {msg.image && <img src={msg.image} alt="uploaded" width="100" />}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Mensajes;
