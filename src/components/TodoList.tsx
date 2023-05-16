import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "lib/utils/todosApiSlice";
import { useEffect, useState } from "react";
import { Box } from "@/styles/components/TodoList.styled";
let renderCount = 0;
export default function TodoList() {
  // internal
  const [newTodo, setNewTodo] = useState("");
  const [content, setContent]: any = useState();
  // external
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  }: any = useGetTodosQuery();
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
  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button className="submit">
          <h1>Create</h1>
        </button>
      </div>
    </form>
  );
  useEffect(() => {
    // console.log(todos);
    if (isLoading) {
      setContent(<h1 style={{ color: "green" }}>loading...</h1>);
    } else if (isSuccess) {
      setContent(
        todos.map((todo: any) => {
          return (
            <article key={todo._id}>
              <div className="todo">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() =>
                    updateTodo({ ...todo, completed: !todo.completed })
                  }
                />
                <label htmlFor={todo.id}>{todo.title}</label>
              </div>
              <button
                className="trash"
                onClick={() => deleteTodo({ id: todo.id })}
              >
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
  renderCount++;
  return (
    <Box>
      <h1>renderCount : {renderCount}</h1>
      <h1>Todo List</h1>
      <div>{newItemSection}</div>
      <div>{content}</div>
    </Box>
  );
}
