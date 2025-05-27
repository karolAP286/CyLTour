import { Rol } from './Rol';

export interface Usuario {
  id: number;
  rol_id: number;
  nombre: string;
  fecha_nacimiento: string;
  dni: string | null;
  correo: string;
  password: string;
  created_at: string;
  updated_at: string | null;
  rol?: Rol;
}
  