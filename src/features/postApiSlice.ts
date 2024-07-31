import { apiSlice } from "./api/apiSlice";

import { 
    ICreatePostForm, 
    IPostDetails, 
    ISearchPost, 
    IUpdatePostForm 
} from "../constants/interfaces";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchPosts: builder.query({
            query: () => "/post/posts",
        }),
        fetchRecentPosts: builder.query({
            query: () => "/post/recent",
        }),
        fetchPost: builder.query<IPostDetails, string>({
            query: (id: string) => `/post/post?id=${id}`,
        }),
        searchPost: builder.query({
            query: (searchQuery: ISearchPost) => `/post/search?for=${searchQuery.term}&category=${searchQuery.category}&sort=${searchQuery.sort}`
        }),
        createPost: builder.mutation({
            query: (formData: ICreatePostForm) => ({
                url: "/post/create-post",
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [
                { type: "Post" }
            ]
        }),
        uploadPostImg: builder.mutation({
            query: ({ formData, id }: { formData: FormData, id: string }) => ({
                url: `/post/upload-post-img?imgId=${id}`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [
                { type: "Post" }
            ]
        }),
        deletePostImg: builder.mutation<void, void>({
            query: () => ({
                url: "/post/delete-post-img",
                method: 'POST',
            })
        }),
        updatePost: builder.mutation({
            query: (formData: IUpdatePostForm) => ({
                url: "/post/update-post",
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [
                { type: "Post" }
            ]
        }),
        deletePost: builder.mutation({
            query: (id: string) => ({
                url: "/post/delete-post",
                method: 'POST',
                body: { id }
            })
        })
    }),
});

export const { 
    useFetchPostQuery,
    useFetchPostsQuery,
    useFetchRecentPostsQuery,
    useSearchPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useUploadPostImgMutation,
    useDeletePostImgMutation,
    useDeletePostMutation,
} = postApiSlice;