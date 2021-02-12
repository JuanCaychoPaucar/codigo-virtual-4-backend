const express = require('express');
const { Server } = require('http');
const socketio = require('socket.io');

class ServerSocket {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 3000;
        this.httpServer = new Server(this.app);
        this.socket = socketio(this.httpServer, {
            cors: '*'
        });
        this.misSockets();
    }

    misSockets() {
        //* el metodo on(), sirve para recibir una llamada del cliente
        //* en los scokets existen metodos pre-establecidos que solamente podemos interactuar con ellos: connect, disconnect

        let usuarios = [];
        let mensajes = [];

        this.socket.on('connect', (cliente) => {
            console.log("cliente_id : ", cliente.id);

            // proximamente salas de chat
            // console.log("cliente_rooms : ", cliente.rooms);
            // cliente.join('room1');
            // console.log("cliente_rooms : ", cliente.rooms); // sala de chat

            cliente.on('registrar', (username) => {
                // console.log(username);
                const objUsuario = {
                    id: cliente.id,
                    username: username
                }
                usuarios.push(objUsuario);

                // el metodo emit(), sirve para retornarnos la emision al mismo usuario.
                cliente.emit('lista-usuarios', usuarios);

                // si queremos notificar a todos los clientes conectados, deberemos utilizar un broadcast, PERO no se notificara al cliente actual
                cliente.broadcast.emit('lista-usuarios', usuarios);
            });



            cliente.on('mensaje-nuevo', (mensaje) => {
                console.log("mensaje: ", mensaje);

                const usuario = usuarios.filter(usuario => usuario.id == cliente.id)[0];
                mensajes.push({
                    cliente : usuario.username,
                    mensaje : mensaje
                });

                //* este emit() es para enviar al frontend
                cliente.emit('enviar-mensajes', mensajes);
                cliente.broadcast.emit('enviar-mensajes', mensajes);
            });



            //! https://socket.io/docs/v3/server-api/#Event-'disconnect'
            cliente.on('disconnect', (reason) => {
                console.log("razon de la desconexion : ", reason);
                console.log('Se desconectó !!  :(');
            });
        })
    }

    start() {
        this.httpServer.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`);
        });
    }
}

module.exports = ServerSocket;

/**
 * NOTA:
 * Al trabjar con sockets, debemos de hacerlo con la libreria 'http', con su clase Server
 *
 * Para que no se bloquee por los CORS
 * https://socket.io/docs/v3/server-api/
 */