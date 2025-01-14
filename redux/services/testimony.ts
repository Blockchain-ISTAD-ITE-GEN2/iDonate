import { idonateApi } from "@/redux/api";

export const testimonialApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => `/testimonies`,
      providesTags: [{ type: "testimonial", id: "LIST" }],
    }),
    createTestimonials: builder.mutation({
      query: (newTestimonial) => ({
          url: '/testimonies',
          method: 'POST',
          body: newTestimonial,
      }),
      invalidatesTags: [{type: 'testimonial', id: 'LIST'}],
    }),
    editTestimonials: builder.mutation({
      query: ({uuid, updatedData}) => ({
          url: `/testimonies/${uuid}`,
          method: 'PUT',
          body: updatedData,
      }),
      invalidatesTags: [{type: 'testimonial', id: 'LIST'}],
    }),
    deleteTestimonials: builder.mutation({
      query: (uuid) => ({
          url: `/testimonies/${uuid}`,
          method: 'DELETE',
      }),
      invalidatesTags: [{type: 'testimonial', id: 'LIST'}],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialApi;
