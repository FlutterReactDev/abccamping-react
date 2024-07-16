import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API_URL,
        credentials: "include",
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: ["auth", "user"],
});
