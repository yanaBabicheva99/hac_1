import {createApi} from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../middleware/interceptor";

export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: customFetchBase,
    tagTypes: ['Task'],
    endpoints: (build) => ({
        createTask: build.mutation({
            query: (content) => ({
                url: '/tasks',
                method: 'POST',
                body: content
            }),
            invalidatesTags: ['Task']
        })
    })
});

export const {useCreateTaskMutation} = taskAPI