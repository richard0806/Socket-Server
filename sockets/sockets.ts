import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';



export const usuariosConectador = new UsuariosLista();

export const desconectar = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    usuariosConectador.removerUsuario(cliente.id);
    const usuariosConectados = usuariosConectador.obtenerLista();
    console.log('Cliente Desconectado');
    console.log("=== Usuarios Conectados===", usuariosConectados);
    // console.log(`Usuario ${nombre} desconectado`);
  });
};

// recibiendo mensajes desde FrondEnd
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("Mensaje recibido", payload);
    io.emit("mensaje-nuevo", payload);
  });
};

//configurando usuario
export const configUsuarios = (cliente: Socket, io: socketIO.Server) => {
         cliente.on("configurar-usuario", (payload, callback: Function) => {
          usuariosConectador.actualizarNombre(cliente.id,payload.nombre);
          // console.log("Configurando Usuario", payload.nombre);
          callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
          });
           //  return payload.nombre;
         });
       };

export const conectarCliente = (cliente:Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectador.agregar(usuario);
}
