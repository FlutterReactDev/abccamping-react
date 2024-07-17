import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: window.location.origin + "/admin",
        credentials: "include",
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: ["auth", "user"],
});
