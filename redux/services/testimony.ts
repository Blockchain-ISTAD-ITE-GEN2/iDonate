import { idonateApi } from "@/redux/api";

export const testimonialApi = idonateApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => `/testimonies`,
      providesTags: [{ type: "testimonial", id: "LIST" }],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialApi;
