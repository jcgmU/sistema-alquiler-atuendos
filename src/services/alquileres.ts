import { http } from "../lib/http";

export interface RegistrarAlquilerDTO {
  clienteIdent: string;
  empleadoIdent: string;
  referencias: string[];
  fechaAlquiler: string;
}
export interface Alquiler {
  numero: string;
  fechaAlquiler: string;
  cliente: { identificacion: string; nombre: string };
  empleado: { identificacion: string; nombre: string };
  prendas: Array<{
    prenda: {
      referencia: string;
      talla: string;
      color?: string;
      valorAlquiler: string;
    };
    cantidad: number;
  }>;
}
export const alquileresApi = {
  registrar: async (d: RegistrarAlquilerDTO) =>
    (await http.post<{ numero: string; precioTotal: number }>("/api/alquileres", d)).data,
  obtener: async (n: string) =>
    (await http.get<Alquiler>(`/api/alquileres/${n}`)).data,
  listarPorFecha: async (fecha: string) =>
    (await http.get<Alquiler[]>("/api/alquileres", { params: { fecha } })).data,
};
