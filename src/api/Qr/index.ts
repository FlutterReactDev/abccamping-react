import { baseApi } from "../Base";

const qrApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQr: build.query<string, void>({
            query: () => ({
                url: "/admin/qr/:group_id/image.png",
            }),
        }),
    }),
});

export const { useGetQrQuery } = qrApi;
