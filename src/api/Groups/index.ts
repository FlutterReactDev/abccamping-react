import { baseApi } from "../Base";
import { CreateGroupRequest, EditGroupRequest } from "./types";

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

        editGroup: build.mutation<
            void,
            {
                groupId: number;
                data: EditGroupRequest;
            }
        >({
            query: ({ groupId, data }) => ({
                url: `/groups/${groupId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["splits"],
        }),
    }),
});

export const {
    useCreateGroupMutation,
    useDeteleGroupMutation,
    useEditGroupMutation,
} = groupsApi;
