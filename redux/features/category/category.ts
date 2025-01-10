import { idonateApi } from "@/redux/api";


export const categoryApi = idonateApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/faculties?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'category', id: 'LIST'}],
        }),
    })
})
export const {
    useGetFacultiesQuery
} = categoryApi;