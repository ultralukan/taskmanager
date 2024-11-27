import { baseApi } from "./baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TASK']
    }),
    getTask: builder.query({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
      providesTags: ['TASK']
    }),
    editTask: builder.mutation({
      query: ({data, id}) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TASK']
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TASK']
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation
} = tasksApi;