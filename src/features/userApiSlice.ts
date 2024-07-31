import { apiSlice } from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchUsers: builder.query({
            query: () => "/user/users",
        }),
        fetchDashDetails: builder.query({
            query: () => "/user/dashboard",
        }),
        changeProfile: builder.mutation({
            query: (formData: FormData) => ({
                url: "/user/profile",
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [
                { type: "User" }
            ]
        }),
        deleteUser: builder.mutation({
            query: (id: string) => ({
                url: "/user/delete-user",
                method: 'POST',
                body: { id }
            })
        })
    }),
});

export const { 
    useFetchUsersQuery,
    useDeleteUserMutation,
    useChangeProfileMutation,
    useFetchDashDetailsQuery,
} = userApiSlice;