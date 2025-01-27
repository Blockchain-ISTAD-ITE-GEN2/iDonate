import { idonateApi } from "@/redux/api";

export const eventApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/events`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getEventByUuid: builder.query({
      query: (uuid) => `/events/${uuid}`,
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
    getEventsByCategory: builder.query({
      query: (categoryUuid:string) => `/events/get-event-by-category/${categoryUuid}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
  }),
});

export const { 
  useGetEventsQuery,
  useGetEventByUuidQuery,
  useGetEventsByCategoryQuery
 } = eventApi;
