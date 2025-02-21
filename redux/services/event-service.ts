import { idonateApi } from "@/redux/api";

export const eventApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `/events`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getEventByUuid: builder.query({
      query: (uuid) => `/events/get-event-by-uuid/${uuid}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getDraftEventsFalse: builder.query({
      query: ({ isDraft = false }) =>
        `/events/get-draft-events?isDraft=${isDraft}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getVisibleEvents: builder.query({
      query: ({ isVisible = true }) => `/events?isVisible=${isVisible}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getDraftEventsTrue: builder.query({
      query: ({ isDraft = true }) =>
        `/events/get-draft-events?isDraft=${isDraft}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getEventByCategory: builder.query({
      query: ({ uuid }) => `/events/get-event-by-category/${uuid}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getEventByOrganization: builder.query({
      query: (orgUuid: string) =>
        `/events/get-event-by-organization/${orgUuid}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getEventByUser: builder.query({
      query: ({ uuid }) => `/events/get-event-by-category/${uuid}`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    getUrgentEvents: builder.query({
      query: () => `/events/urgent-events`,
      providesTags: [{ type: "event", id: "LIST" }],
    }),
    createEvents: builder.mutation({
      query: ({ categoryUuid, organizationUuid, newEvent }) => ({
        url: `/events/${organizationUuid}/${categoryUuid}`,
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
    comfirmEvent: builder.mutation({
      query: (uuid) => ({
        url: `/events/confirm-draft/${uuid}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
    hideEvent: builder.mutation({
      query: (uuid) => ({
        url: `/events/${uuid}/hide-event`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "event", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetDraftEventsFalseQuery,
  useGetDraftEventsTrueQuery,
  useGetEventByCategoryQuery,
  useGetEventByUuidQuery,
  useGetEventByOrganizationQuery,
  useGetUrgentEventsQuery,
  useDeleteEventsMutation,
  useEditEventsMutation,
  useCreateEventsMutation,
  useComfirmEventMutation,
  useHideEventMutation,
} = eventApi;
