import { AppDispatch } from './../store/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { setToken } from '@/redux/features/auth/authSlice';
import { headers } from 'next/headers';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_IDONATE_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        // Attempt to refresh the token
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            api.dispatch(setToken(refreshData.accessToken));
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Handle token refresh failure (e.g., log out the user)
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });
            // You might want to clear the token from the state here
        //    api.dispatch(clearToken());
            const data = await res.json();
            console.log("Token refresh failed, user logged out");
        }
    }
    return result;
};

export const idonateApi = createApi({
    tagTypes : [ "project", "favourite", "userProfile", "media"],
    reducerPath: "idonateApi",
    baseQuery: baseQueryWithReAuth, 
    endpoints: () => ({}),
});