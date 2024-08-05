import { getBaseUrl } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}`,
    }),
    reducerPath: "baseApi",
    endpoints: () => ({}),
    tagTypes: ["splits", "groups", "donate"],
});
