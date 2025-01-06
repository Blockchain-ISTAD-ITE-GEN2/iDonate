import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export interface RegisterRequest{
  firstName: string
  lastName: string
  gender: 'Male' | 'Female' | ' ';
  phoneNumber: string
  email: string
  username: string
  password: string
  dateOfBirth: Date | string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterRequest, "message:">({
      query: (credentials) => ({
        url: '/users/user-register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useRegisterMutation } = authApi

