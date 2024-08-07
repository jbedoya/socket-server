import express from 'express';
import { SERVER_PORT } from '../global/environment';
//import socketIO from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import http from 'http'

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port:number;

    //public io: socketIO.Server;
    public io: SocketServer;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = http.createServer(this.app);
        //this.httpServer = new http.Server(this.app);
        
       // this.io = socketIO(this.httpServer);
        this.io = new SocketServer(this.httpServer);
        //this.io = require('socket.io')(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets')
                    
        this.io.on('connection', cliente =>{
            //console.log('Cliente conectado')

            // Conectar cliente
            socket.conectarCliente( cliente, this.io );

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(  cliente, this.io );

            // Mensajes
            socket.mensaje(cliente, this.io);
            // Desconectar
            socket.desconectar( cliente, this.io);           

        });
       
    }

    start = (callback: any) =>{
        this.httpServer.listen(this.port, callback);
    }
}