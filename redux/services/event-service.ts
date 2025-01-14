import { idonateApi } from "@/redux/api";

export const eventApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/events`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
