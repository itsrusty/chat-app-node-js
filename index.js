const { Socket } = require('engine.io');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// html route
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});


// socket use 
io.on('connection', (socket)=>{
    console.log("Usuario conectado en el puerto: 3000")
})


// si un usuario se desconecta entonces mostramos msj por consola
io.on('connection', (socket) => {
    console.log('');
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
});


// imprimimos el msj escrito por consola 
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('mensaje: ' + msg);
    });
  });


  // mostrando si se conecta un usuario
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


// listening in port 3000
server.listen(3000, () => {
  console.log('listening on 3000');
});