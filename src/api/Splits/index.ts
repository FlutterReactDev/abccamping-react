import { baseApi } from "../Base";
import {
    CreateSplitRequest,
    EditSplitRequest,
    Split,
    SplitDetail,
} from "./types";

const splitsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSplitList: build.query<Split[], void>({
            query: () => ({
                url: "/splits",
                method: "GET",
            }),

            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "splits" as const,
                              id,
                          })),
                          "splits",
                      ]
                    : ["splits"],
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

        editSplit: build.mutation<
            void,
            {
                splitId: number;
                data: EditSplitRequest;
            }
        >({
            query: ({ splitId, data }) => ({
                url: `/splits/${splitId}`,
                method: "PATCH",
                body: data,
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
    useEditSplitMutation,
} = splitsApi;
