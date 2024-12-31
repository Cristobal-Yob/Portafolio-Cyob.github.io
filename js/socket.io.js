const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentNumber = 42; // Número base para mostrar a los usuarios
let specialUserId = null; // ID del usuario que verá un número diferente

// Sirve archivos estáticos del frontend
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.id);

  // Cuando un usuario se conecta, decide si será el "especial"
  if (!specialUserId) {
    specialUserId = socket.id;
    console.log(`Usuario especial asignado: ${specialUserId}`);
  }

  // Envía el número al usuario conectado
  socket.emit("updateNumber", {
    number: socket.id === specialUserId ? currentNumber + 1 : currentNumber,
  });

  // Manejo de desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
    if (socket.id === specialUserId) {
      specialUserId = null; // Libera el usuario especial
    }
  });
});

// Inicia el servidor
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
