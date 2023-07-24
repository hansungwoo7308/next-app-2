import { useEffect, useState } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "lib/utils/todosApiSlice";
import { Box } from "@/styles/components/TodoList.styled";
export default function TodoList() {
  // 비정상으로 동작한다. 수정이 필요하다.
  const [newTodo, setNewTodo] = useState("");
  const [content, setContent]: any = useState();
  const { data: todos, isLoading, isSuccess, isError, error }: any = useGetTodosQuery();
  //   console.log("test : ", useGetTodosQuery({ query: "todos" }));
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo({ userId: 1, id: 100, title: newTodo, completed: false });
    setNewTodo("");
    console.log("todos : ", todos);
  };
  useEffect(() => {
    // console.log(todos);
    if (isLoading) {
      setContent(<h1 style={{ color: "green" }}>loading...</h1>);
    } else if (isSuccess) {
      setContent(
        todos.map((todo: any) => {
          return (
            <article key={todo._id}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                />
                <label htmlFor={todo.id}>{todo.title}</label>
              </div>
              <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                <h1>Delete</h1>
              </button>
            </article>
          );
        })
      );
    } else if (isError) {
      setContent(<h1 style={{ color: "red" }}>{error.message}</h1>);
    }
  }, [todos]);
  return (
    <Box>
      <h1>todo-list (Dynamic : Database)</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter a new todo item</label>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
          <button className="submit">Create</button>
        </div>
      </form>
      <div>{content}</div>
    </Box>
  );
}
