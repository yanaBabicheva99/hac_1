import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../middleware/interceptor";

//fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api/',
//         prepareHeaders: (headers) => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//                 headers.set('content-type', 'text/plain');
//             }
//             return headers;
//         }
//     })

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: (result) => ["User"],
    }),
    getUsers: build.query({
      query: () => ({
        url: "users",
      }),
      providesTags: (result) => ["User"],
    }),
    changeUserInf: build.mutation({
      query: (content) => ({
        url: 'user',
        method: 'PUT',
        body: content
      }),
      invalidatesTags: ['User']
    }),
    getAvatar: build.query({
      query: (path) => ({
        url: `avatar/${path}`,
      }),
      providesTags: (result) => ["User"],
    }),
    updateImg: build.mutation<any, any>({
      query: (content) => ({
        url: "avatar",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateImgMutation,
  useGetUserQuery,
  useGetAvatarQuery,
  useGetUsersQuery,
    useChangeUserInfMutation
} = userAPI;
