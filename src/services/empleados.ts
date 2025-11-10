import { http } from "../lib/http";
export interface Empleado {
  id: string;
  identificacion: string;
  nombre: string;
  cargo: string;
  telefono?: string;
}
export interface CrearEmpleadoDTO {
  identificacion: string;
  nombre: string;
  cargo: string;
  telefono?: string;
}
export const empleadosApi = {
  crear: async (data: CrearEmpleadoDTO) =>
    (await http.post<Empleado>("/api/empleados", data)).data,
  obtener: async (ident: string) =>
    (await http.get<Empleado>(`/api/empleados/${ident}`)).data,
};
