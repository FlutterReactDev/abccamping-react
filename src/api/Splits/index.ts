import { baseApi } from "../Base";
import { Split, SplitDetail } from "./types";

const splitsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSplitList: build.query<Split[], void>({
            query: () => ({
                url: "/admin/splits",
                method: "GET",
            }),
        }),

        getSplitDetail: build.query<SplitDetail, number>({
            query: (id) => ({
                url: `/admin/splits/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetSplitDetailQuery, useGetSplitListQuery } = splitsApi;
