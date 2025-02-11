export interface GenerarEstadoCuentaProps {

    startDate: Date | null; 
    endDate: Date | null;
    placas: Value[]
}


export interface Value {
  title: string;
  inputValue?: string;
}