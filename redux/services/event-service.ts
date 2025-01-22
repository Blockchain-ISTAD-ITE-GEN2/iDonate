import { idonateApi } from "@/redux/api";

export const eventApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/api/v1/events`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    createEvents: builder.mutation({
      query: (newEvent) => ({
        url: "/events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
    editEvents: builder.mutation({
      query: ({ uuid, updatedData }) => ({
        url: `/events/${uuid}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
    deleteEvents: builder.mutation({
      query: (uuid) => ({
        url: `/events/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
  }),
});

export const { useGetEventsQuery } = eventApi;
