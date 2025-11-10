import { http } from "../lib/http";

export type TipoPrenda = "DAMA" | "CABALLERO" | "DISFRAZ";
export type LargoCorto = "LARGO" | "CORTO";
export type TipoTraje = "FRAC" | "SMOKING" | "CLASICO";
export type Accesorio = "CORBATA" | "CORBATIN";

export interface Prenda {
  id: string;
  referencia: string;
  tipo: TipoPrenda;
  talla: string;
  color?: string;
  marca?: string;
  valorAlquiler: string;
  disponible?: boolean;
}

export interface CrearPrendaDamaDTO {
  tipo: "DAMA";
  referencia: string;
  talla: string;
  color?: string;
  marca?: string;
  valorAlquiler: number;
  pedreria: boolean;
  largoCorto: LargoCorto;
  cantidadPiezas: number;
}
export interface CrearPrendaCaballeroDTO {
  tipo: "CABALLERO";
  referencia: string;
  talla: string;
  color?: string;
  marca?: string;
  valorAlquiler: number;
  tipoTraje: TipoTraje;
  accesorio: Accesorio;
}
export interface CrearPrendaDisfrazDTO {
  tipo: "DISFRAZ";
  referencia: string;
  talla: string;
  valorAlquiler: number;
  nombreDisfraz: string;
}
export type CrearPrendaDTO =
  | CrearPrendaDamaDTO
  | CrearPrendaCaballeroDTO
  | CrearPrendaDisfrazDTO;

export const prendasApi = {
  crear: async (data: CrearPrendaDTO) =>
    (await http.post<Prenda>("/api/prendas", data)).data,
  listar: async (talla?: string) =>
    (await http.get("/api/prendas", { params: talla ? { talla } : {} }))
      .data as Record<string, any[]>,
  obtener: async (ref: string) =>
    (await http.get<Prenda>(`/api/prendas/${ref}`)).data,
  costoTotal: async (ref: string) =>
    (await http.get<{ total: number }>(`/api/prendas/${ref}/costo-total`)).data,
  agregarComponente: async (
    ref: string,
    componenteRef: string,
    cantidad: number
  ) =>
    (
      await http.post(`/api/prendas/${ref}/componentes`, {
        componenteRef,
        cantidad,
      })
    ).data,
};
