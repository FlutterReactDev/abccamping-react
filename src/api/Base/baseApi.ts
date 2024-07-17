import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://qr.konkov2024.ru",
        credentials: "include",
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: ["auth", "user"],
});
