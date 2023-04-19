import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "lib/utility/apiSlice";
import { useEffect, useState } from "react";

let renderCount = 0;

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [content, setContent]: any = useState();

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
    addTodo({ userId: 1, title: newTodo, completed: false });
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
          <h1>Upload</h1>
        </button>
      </div>
    </form>
  );

  useEffect(() => {
    if (isLoading) {
      setContent(<h1 style={{ color: "green" }}>loading...</h1>);
    } else if (isSuccess) {
      setContent(
        todos.map((todo: any) => {
          return (
            <article key={todo.id}>
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
    <div className="todos">
      <h1>renderCount : {renderCount}</h1>
      <h1>Todo List</h1>
      <div>{newItemSection}</div>
      <div>{content}</div>
    </div>
  );
};
export default TodoList;
