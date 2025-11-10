import { http } from "../lib/http";
export type Prioridad = "NORMAL" | "ALTA" | "URGENTE";
export type EstadoLavanderia = "EN_COLA" | "ENVIADA";
export interface RegistrarLavanderiaDTO {
  referencia: string;
  manchada: boolean;
  delicada: boolean;
  urgente: boolean;
}
export interface ItemLavanderia {
  id: string;
  prendaId: string;
  prioridad: Prioridad;
  estado: EstadoLavanderia;
  fechaRegistro: string;
  prenda: { referencia: string; tipo: string; talla: string };
}
export const lavanderiaApi = {
  registrar: async (d: RegistrarLavanderiaDTO) =>
    (await http.post<ItemLavanderia>("/api/lavanderia", d)).data,
  listarCola: async () =>
    (await http.get<ItemLavanderia[]>("/api/lavanderia")).data,
  enviarALavar: async (cantidad: number) =>
    (await http.post("/api/lavanderia/enviar", { cantidad })).data,
};
