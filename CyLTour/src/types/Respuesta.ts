import { Comentario } from './Comentario';
import { Usuario } from './Usuario';

export interface Respuesta {
  id: number;
  comentario_id: number;
  contenido: string;
  usuario_id: number;
  created_at: string;
  updated_at: string;
  comentario: Comentario; 
  usuario: Usuario;        
}