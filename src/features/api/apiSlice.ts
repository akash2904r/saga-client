import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://saga-server-j1ko.onrender.com" }),
    tagTypes: ["User", "Post", "Comment"],
    endpoints: builder => ({})
});