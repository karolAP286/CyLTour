import { Usuario } from './Usuario';

export interface Comentario {
  id: number;
  puntuacion: number;
  contenido: string;
  url_imagen: string | null;
  usuario_id: number;
  estado: boolean;
  monumento_id: number;
  respuesta: boolean;
  created_at: string;
  updated_at: string | null;
  usuario: Usuario; 
}
  