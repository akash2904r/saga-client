import { apiSlice } from "./api/apiSlice";

import { 
    IComment, 
    IFetchComments, 
    IFetchedComment, 
    ILikeComment 
} from "../constants/interfaces";

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchComments: builder.query({
            query: () => "/comment/comments",
            providesTags: (comments) => comments 
                ? [...comments.map((comment: IFetchComments) => ({ type: 'Comment', id: comment._id })), 'Comment'] 
                : ['Comment']
        }),
        fetchPostComments: builder.query({
            query: ({ id, postId }: { id: string, postId: string }) => `/comment/post?id=${id}&postId=${postId}`,
            providesTags: (comments) => comments 
                ? [...comments.map((comment: IFetchedComment) => ({ type: 'Comment', id: comment._id })), 'Comment'] 
                : ['Comment']
        }),
        addComment: builder.mutation({
            query: (formData: IComment) => ({
                url: "/comment/add-comment",
                method: 'POST',
                body: formData
            }),
        }),
        likeAComment: builder.mutation<void, ILikeComment>({
            query: ({ id, commentId }: { id: string, commentId: string }) => ({
                url: "/comment/like",
                method: 'PATCH',
                body: { id, commentId }
            }),
            invalidatesTags: (result, error, { commentId }) => [{ type: 'Comment', id: commentId }]
        }),
        editComment: builder.mutation({
            query: ({ id, content }: { id: string, content: string }) => ({
                url: "/comment/edit",
                method: 'PATCH',
                body: { id, content }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comment', id }]
        }),
        deleteComment: builder.mutation({
            query: (id: string) => ({
                url: "/comment/delete",
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Comment', id }]
        })
    }),
});

export const { 
    useFetchCommentsQuery,
    useFetchPostCommentsQuery,
    useAddCommentMutation,
    useLikeACommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
} = commentApiSlice;