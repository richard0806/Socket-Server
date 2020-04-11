import { Usuario } from "./usuario";


export class UsuariosLista {

    private lista : Usuario[] = [];

    constructor() { }

    /**
     * Agregar usuarios
     * @param usuario 
     */
    public agregar( usuario: Usuario ){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    /**
     * Actualizar Nombre de Usuarios
     * @param id 
     * @param nombre 
     */
    public actualizarNombre(id:string, nombre: string){
        for (let usuario of this.lista) {
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando Usuario ====');
        console.log(this.lista);
    }

    /**
     * Retornamos los usuarios conectados
     */
    public obtenerLista() {
        return this.lista;
    }

    /**
     * Obtener Usuario por id
     * @param id 
     */
    public obtenerUsuario(id:string){
        this.lista.find( usuario => usuario.id === id );
    }

    /**
     * Ver Usuarios En sala
     * @param sala 
     */
    public obtenerUsuariosEnSala(sala:string){
        this.lista.filter( usuario => usuario.sala === sala)
    }

    /**
     * Borrar usuario
     * @param id 
     */
    public removerUsuario(id:string){
        const tempUsuario = this.obtenerUsuario(id);
        this.lista = this.lista.filter( usuario => usuario.id !== id);
        return tempUsuario;
    }
}