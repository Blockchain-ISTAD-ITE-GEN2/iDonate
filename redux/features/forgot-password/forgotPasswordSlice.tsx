// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/redux/store";
// import { BASE_URL, ACCESS_TOKEN } from "@/lib/constants";

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { idonateApi } from "@/redux/api";

type forgotPasswordState = {
        email: string;
        status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: forgotPasswordState = {
    email: '',
    status: 'idle'
}

export const authApi = idonateApi.injectEndpoints({
        endpoints: (builder) => ({
                forgotPassword: builder.mutation<any,{email:any}>({
                        query: (email) => (
                                {
                                        url: '/api/v1/users/forget-password',
                                        method: 'POST',
                                        body: email
                                }
                        )
                }),
        })
})

const forgotPasswordSlice = createSlice({
        name: "forgotPassword",
        initialState,
        reducers: {
                setEmail: (state, action) => {
                state.email = action.payload;
                }
        }
})

// export const {
//         useForgotPasswordMutation
// }= authApi;
export default forgotPasswordSlice.reducer;

// // create asyn thunk
// export const fetchUserProfile = createAsyncThunk("userProfile/fetchUserProfile", async () => {
//     const response = await fetch(`${BASE_URL}/api/user/profile/`,{
//         headers: {
//             Authorization: `Bearer ${ACCESS_TOKEN}`
//         }
//     });
//     const data = await response.json();
//     return data;
// })


//  const userProfileSlice = createSlice({
//     name: "userProfile",
//     initialState,
//     reducers: {
//         // standard reducer logic, with auto-generated action types per reducer
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUserProfile.pending, (state) => {
//             state.status = 'loading';
//         });
//         builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
//             state.status = 'success';
//             state.userProfile = action.payload;
//         });
//         builder.addCase(fetchUserProfile.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//         });
//     }
// })

// export default userProfileSlice.reducer;

// // create selector
// export const selectAvatar = (state: RootState) => state.userProfile.userProfile?.avatar;
// export const selectBio = (state: RootState) => state.userProfile.userProfile?.bio;

