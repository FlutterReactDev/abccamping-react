import { baseApi } from "../Base";
import { CreateSplitRequest, Split, SplitDetail } from "./types";

const splitsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSplitList: build.query<Split[], void>({
            query: () => ({
                url: "/splits",
                method: "GET",
            }),
        }),

        getSplitDetail: build.query<SplitDetail[], number>({
            query: (id) => ({
                url: `/splits/${id}`,
                method: "GET",
            }),
        }),
        createSplit: build.mutation<void, CreateSplitRequest>({
            query: (data) => ({
                url: "/splits",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetSplitDetailQuery,
    useGetSplitListQuery,
    useCreateSplitMutation,
} = splitsApi;
