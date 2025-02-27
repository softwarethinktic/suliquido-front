import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { fletesApi } from "../../api/fletesApi";



const fleteAdapter = createEntityAdapter();



const initialState  = fleteAdapter.getInitialState();


export const fletesApiSlice = fletesApi.injectEndpoints({
    endpoints: (builder) => ({
        getFletes: builder.query({
            query: (params) => {
                return {
                    url: 'query/',
                    params
                };
            },
            transformResponse(res: any) {
                return fleteAdapter.setAll(initialState, res.manifiestos);
            },
        }),
    }),
    overrideExisting: false,

});

export const {useGetFletesQuery} = fletesApiSlice;

export const selectFleteResult = createSelector([state => state, (_, params) => params], (state, params) =>
    fletesApiSlice.endpoints.getFletes.select(params)(state)?.data ?? initialState)



