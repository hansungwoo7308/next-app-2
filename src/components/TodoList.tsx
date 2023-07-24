import { useEffect } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "lib/utils/todosApiSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal } from "lib/client/store/modalSlice";
import { useForm } from "react-hook-form";
export default function TodoList() {
  const dispatch = useDispatch();
  // get the data
  const { data: todos, isLoading, isSuccess, isError, error }: any = useGetTodosQuery();
  // get the actions from redux-toolkit-query
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  // get the methods react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  // set the processors
  const handleCreate = (data: any) => {
    // console.log({ data });
    const { todo } = data;
    addTodo({ title: todo, completed: false });
    reset();
  };
  const handleDelete = (_id: string) => {
    // console.log({ _id });
    const callback = () => deleteTodo({ _id });
    const payload = {
      type: "DELETE_TODO_LIST_ITEM",
      message: "Do you want to delete?",
      callback,
    };
    dispatch(openModal(payload));
  };
  useEffect(() => setFocus("todo"), []);
  return (
    <Box>
      <div className="todo-list-header">
        <h1>Todo List Component (Client - RTK Query - DB)</h1>
        <p>server : http://localhost:3000/api/todos</p>
      </div>
      <div className="todo-list-create-form">
        <form onSubmit={handleSubmit(handleCreate)}>
          <input
            {...register("todo", { required: true })}
            type="text"
            placeholder="Enter a new todo"
          />
          <button className="submit">Create</button>
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
              <button
                className="test"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(todo._id);
                }}
              >
                <h1>Delete with callback</h1>
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
