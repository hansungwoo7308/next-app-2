import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // redux store path
  // just default
  reducerPath: "api",

  // query할 baseUrl을 설정한다.
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),

  // cached data
  // todolist는 데이터를 캐싱할 필요가 있다.
  tagTypes: ["Todos"],

  // endpoints property에
  // builder object로 api actions를 생성하도록, 콜백을 설정한다.
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res: any) => {
        console.log("res : ", res);
        return res.sort((a: any, b: any) => b.id - a.id);
      },
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      // cached data를 invalidate하고 getTodos를 통해 query 요청을 한다.
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// api actions
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
}: any = apiSlice;
