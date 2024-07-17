import { baseApi } from "../Base";

const qrApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQr: build.query({
            query: () => ({
                url: "/admin/qr/:group_id/image.png",
            }),
        }),
    }),
});

export const { useGetQrQuery } = qrApi;
