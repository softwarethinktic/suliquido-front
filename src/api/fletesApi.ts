import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { ManifiestoPaged } from "../interfaces/fletes.interface";

const { VITE_API_URL } = getEnvVariables();

export const fletesApi = createApi({
  reducerPath: "fletes",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL + '/manifiesto',
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getFletes: builder.query<{ok:Boolean, response?: ManifiestoPaged, msg?: string}, {numeroManifiesto?: string, placa?: string, fecha?: string, productName?: string, page?: number, size?: number }>({
      query: ({numeroManifiesto, placa, fecha, productName, page, size}) => {
        return {
          url: 'query/',
          params: { numeroManifiesto, placa, fecha, productName, page, size},
        };
      }

    }),
  }),
});


export const { useGetFletesQuery, useLazyGetFletesQuery } = fletesApi;