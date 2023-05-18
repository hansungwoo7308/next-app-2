import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const todosApiSlice = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  // cached data
  tagTypes: ["Todos"],
  // endpoints property에
  // builder object로 api actions를 생성하도록, 콜백을 설정한다.
  // baseUrl/query 경로로 요청하고 응답받은 데이터를
  // 캐싱한 데이터(리덕스 스토어의 데이터)와 비교하고
  // 변경이 있으면, getTodos를 다시 요청하고 client에 반영한다.
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
}: any = todosApiSlice;
