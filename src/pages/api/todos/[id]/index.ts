import connectDB from "lib/server/config/connectDB";
import Todo from "lib/server/models/Todo";
connectDB();
export default async function (req: any, res: any) {
  switch (req.method) {
    case "PATCH":
      console.log("\x1b[32m\n[/api/todos/[id]]:::[PATCH]");
      await updateTodo(req, res);
      break;
    case "DELETE":
      console.log("\x1b[32m\n[/api/todos/[id]]:::[DELETE]");
      await deleteTodo(req, res);
      break;
    default:
      break;
  }
}
const updateTodo = async (req: any, res: any) => {
  // get
  const { _id, completed } = req.body;
  console.log({ _id, completed });
  // process
  const updatedTodo = await Todo.findByIdAndUpdate(_id, { completed }, { new: true });
  // out
  console.log({ updatedTodo });
  return res.status(200).json({ updatedTodo });
};
const deleteTodo = async (req: any, res: any) => {
  // get
  const { _id } = req.body;
  console.log({ _id });
  // process
  const deletedTodo = await Todo.findByIdAndDelete(_id, { new: true });
  // out
  console.log({ deletedTodo });
  return res.status(200).json({ deletedTodo });
};
