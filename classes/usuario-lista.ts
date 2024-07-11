import { Usuario } from "./usuario";

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }

    //Agregar usuario a la lista
    public agregar (usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    //Actualizar usuario segun el Id
    public actualizarNombre(id:string, nombre: string) {
        for( let usuario of this.lista) {
            if(usuario.id===id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('=== Actualizacion usuario ===');
        console.log(this.lista);
    }

    //Obtener lista de usuarios
    public getLista(){
        return this.lista;
    }

    //Obtener usuario segun id
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    //Obtener usuario de una sala
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    //Borrar usuario
    borrarUsuario( id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !==id);
        return tempUsuario;
    } 
}