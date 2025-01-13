import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { idonateApi } from '@/redux/api';
import { set } from 'date-fns';

type testimoial ={
        id:string;
        image: string;
        name: string;
        position: string;
        comment: string;
}

type TestimonialState = {
    testimonials: testimoial[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
};


export const testimonialApi = idonateApi.injectEndpoints({
        endpoints: (builder) => ({
                getTestimonials: builder.query<testimoial[], void>({
                query: () => '/api/v1/testimonies',
                
                }),
        }),
        
})

export const { useGetTestimonialsQuery } = testimonialApi;
export const testimonialSlice = createSlice({
       name: 'testimonial',
        initialState: {
                 testimonials: [],
                 status: 'idle',
                 error: null,
        } as TestimonialState,
        reducers:{
                setTestimonials: (state, action: PayloadAction<testimoial[]>) => {
                        state.testimonials = action.payload;
                }
        }
})

export const { setTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;



