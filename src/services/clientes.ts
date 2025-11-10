import { http } from "../lib/http";

export interface Cliente {
  id: string;
  identificacion: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}
export interface CrearClienteDTO {
  identificacion: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}
export const clientesApi = {
  crear: async (data: CrearClienteDTO) =>
    (await http.post<Cliente>("/api/clientes", data)).data,
  obtener: async (ident: string) =>
    (await http.get<Cliente>(`/api/clientes/${ident}`)).data,
  obtenerServicios: async (ident: string, vigentes?: boolean) =>
    (
      await http.get(`/api/clientes/${ident}/servicios`, {
        params: vigentes ? { vigentes: true } : {},
      })
    ).data,
};
