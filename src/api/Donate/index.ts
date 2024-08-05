import { baseApi } from "../Base";

const donateApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDonateQr: build.query<string, void>({
            query: () => ({
                url: `/donate`,
                method: "GET",
            }),
            providesTags: ["donate"],
        }),
    }),
});

export const { useGetDonateQrQuery } = donateApi;
