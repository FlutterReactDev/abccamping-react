import { baseApi } from "../Base";
import { CreateSplitRequest, Split, SplitDetail } from "./types";

const splitsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSplitList: build.query<Split[], void>({
            query: () => ({
                url: "/splits",
                method: "GET",
            }),
            providesTags: ["splits"],
        }),

        getSplitDetail: build.query<SplitDetail[], number>({
            query: (id) => ({
                url: `/splits/${id}`,
                method: "GET",
            }),
            providesTags: ["splits"],
        }),

        createSplit: build.mutation<void, CreateSplitRequest>({
            query: (data) => ({
                url: "/splits",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["splits"],
        }),

        deleteSplit: build.mutation<void, number>({
            query: (splitId) => ({
                url: `/splits/${splitId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["splits"],
        }),
    }),
});

export const {
    useGetSplitDetailQuery,
    useGetSplitListQuery,
    useCreateSplitMutation,
    useDeleteSplitMutation,
} = splitsApi;
