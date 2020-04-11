import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http";

import * as socket from "../sockets/sockets";

export default class Server {
  private static _intance: Server;
  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;
  // usuario = '';

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSockets();
  }

  public static get instance() {
    return this._intance || (this._intance = new this());
  }

  private escucharSockets() {
    console.log("Escuchando conexioones - sockets");
    this.io.on("connection", (cliente) => {
      // console.log("Cliente conectado");

      //Conectar Cliente
      socket.conectarCliente( cliente );

      // Configurando el usuario que acaba de iniciar
      socket.configUsuarios( cliente, this.io );

      // Desconectar
      socket.desconectar( cliente );
      // Mensajes
      socket.mensaje( cliente, this.io );
    });
  }

  start(callback: Function) {
    //this.app.listen(this.port, callback);
    this.httpServer.listen(this.port, callback);
  }
}
