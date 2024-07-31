import { jwtDecode as decode } from "jwt-decode";

import { apiSlice } from "./api/apiSlice";
import { IAuthForm, IAuthUser, IAuthUserUnit } from "../constants/interfaces";

const transformIntoUserData = (responseData: IAuthUser) => {
    const token = responseData.accessToken;
    const name = responseData.user.username;
    const { username, ...omittedUser } = responseData.user;
    const user: Omit<IAuthUserUnit, 'username'> & { name: string } = { ...omittedUser, name };

    if (token) {
        const decodedToken = decode(token);
        user.exp = decodedToken.exp!;
        user.accessToken = token;
    }
    
    return user;
};

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGoogleUserData: builder.mutation({
            query: (code: string) => ({
                url: "/auth/google",
                method: 'POST',
                body: { code },
            }),
            transformResponse: transformIntoUserData,
            invalidatesTags: [
                { type: "User" }
            ]
        }),
        signUp: builder.mutation({
            query: (formData: IAuthForm) => ({
                url: "/auth/signup",
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [
                { type: "User" }
            ]
        }),
        signIn: builder.mutation({
            query: (formData: IAuthForm) => ({
                url: "/auth/signin",
                method: 'POST',
                body: formData,
                credentials: 'include'
            }),
            transformResponse: transformIntoUserData,
            invalidatesTags: [
                { type: "User" }
            ]
        }),
        refresh: builder.mutation<Omit<IAuthUserUnit, 'username'> & { name: string }, void>({
            query: () => ({
                url: "/auth/refresh",
                method: 'POST',
                credentials: 'include'
            }),
            transformResponse: transformIntoUserData,
            invalidatesTags: [
                { type: "User" }
            ]
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/signout",
                method: 'POST',
                credentials: 'include'
            }),
        }),
        delete: builder.mutation({
            query: (id: string) => ({
                url: "/auth/delete",
                method: 'POST',
                credentials: 'include', 
                body: { id },
            }),
        })
    }),
});

export const { 
    useSignUpMutation, 
    useSignInMutation, 
    useRefreshMutation,
    useSignOutMutation,
    useDeleteMutation,
    useGetGoogleUserDataMutation
} = authApiSlice;