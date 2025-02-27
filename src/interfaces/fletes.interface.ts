import { Moment } from "moment";

export interface GenerarEstadoCuentaProps {
  startDate: Date | null;
  endDate: Date | null;
  placas: Value[];
}

export interface Value {
  title: string;
  inputValue?: string;
}

export interface Manifiesto {
  id: number;
  numeroManifiesto: string;
  tipoMfto: string;
  fecha: Date;
  estado: string;
  ruta: string;
  producto: JSON;
  descuentos: JSON;
  valorFlete: number;
  valorTons: number;
  anticipos: number;
  reteFte: number;
  totalLiquidacion: number;
  totalOtrosDescuentos: number;
  observaciones: null | string;
  propietarioId: number;
  vehiculoId: number;
  vehiculo: Vehiculo;
  propietario: Propietario;
}

export interface Propietario {
  id: number;
  nombre: string;
  numeroDocumento: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

export interface Vehiculo {
  id: number;
  tipo: string;
  placa: string;
  propietarioId: number;
}

export interface ManifiestoPaged {
  manifiestos: Manifiesto[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}


export interface FleteValues {
  numeroManifiesto: string;
  placa: string;
  fecha: Moment | null;
  productName: string;
}
