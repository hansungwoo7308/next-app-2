import { useEffect, useRef, useState } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "lib/utils/todosApiSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal } from "lib/client/store/modalSlice";
export default function TodoList() {
  const inputRef: any = useRef();
  const [newTodo, setNewTodo]: any = useState("");
  // get the todos from query
  const { data: todos, isLoading, isSuccess, isError, error }: any = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = { title: newTodo, completed: false };
    addTodo(payload);
    setNewTodo("");
    inputRef.current.focus();
    // addTodo({ userId: 1, id: 100, title: newTodo, completed: false }); // 페이로드
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // test
  const dispatch = useDispatch();
  const handleTest = ({ _id }: any) => {
    const callback = () => console.log("good job");
    // const callback = () => deleteTodo({ _id });
    dispatch(openModal({ type: "test", message: "Do you want to delete?", callback }));
  };
  return (
    <Box>
      <div className="todo-list-header">
        <h1>todo-list (Dynamic : Database)</h1>
        <p>server : http://localhost:3000/api/todos</p>
      </div>
      <div className="todo-list-create-form">
        <form onSubmit={handleSubmit}>
          <label>Enter a new todo item</label>
          <div>
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new todo"
            />
            <button className="submit">Create</button>
          </div>
        </form>
      </div>
      <div className="todo-list">
        {isLoading && <h1 style={{ color: "green" }}>loading...</h1>}
        {isError && <h1 style={{ color: "red" }}>{error.message}</h1>}
        {isSuccess &&
          todos.map((todo: any) => (
            <article key={todo._id}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                  id={todo._id}
                />
                <label htmlFor={todo._id}>{todo.title}</label>
              </div>
              <button className="trash" onClick={() => deleteTodo({ _id: todo._id })}>
                <h1>Delete</h1>
              </button>
              <button
                className="test"
                onClick={(e) => {
                  e.preventDefault();
                  handleTest({ _id: todo._id });
                }}
              >
                <h1>Test</h1>
              </button>
            </article>
          ))}
      </div>
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > * {
    border: 1px solid;
  }
  > form {
    width: 100%;
    /* outline: 2px solid red; */
    > div {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      > * {
        width: 100%;
      }
    }
  }
  > div {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    /* outline: 2px solid blue; */
    > article {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border: 1px solid;
    }
  }
`;
