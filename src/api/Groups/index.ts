import { baseApi } from "../Base";
import { CreateGroupRequest } from "./types";

const groupsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createGroup: build.mutation<void, CreateGroupRequest>({
            query: (data) => ({
                url: "/groups",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["splits"],
        }),
        deteleGroup: build.mutation<void, number>({
            query: (groupId) => ({
                url: `/groups/${groupId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["splits"],
        }),
    }),
});

export const { useCreateGroupMutation, useDeteleGroupMutation } = groupsApi;
