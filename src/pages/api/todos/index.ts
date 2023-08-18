import connectDB from "lib/server/config/connectDB";
import Todo from "lib/server/model/Todo";
connectDB();
export default async function (req: any, res: any) {
  // const URI: any = process.env.MONGODB_URI;
  // const OPTIONS: any = {
  //   dbName: "bananaDB",
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // };
  switch (req.method) {
    case "GET":
      console.log("\x1b[32m\n[/api/todos/]:::[GET]");
      await getTodos(req, res);
      break;
    case "POST":
      console.log("\x1b[32m\n[/api/todos/]:::[POST]");
      await createTodo(req, res);
      break;
    default:
      break;
  }
}
const getTodos = async (req: any, res: any) => {
  const todos: any = await Todo.find({});
  if (!todos) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(todos);
};
const createTodo = async (req: any, res: any) => {
  const { title, completed } = req.body;
  console.log({ title, completed });
  const duplicatedData = await Todo.findOne({ title });
  if (duplicatedData) {
    console.log({ duplicatedData });
    return res.status(404).json({ message: "duplicated" });
  }
  const newTodo = await Todo.create({ title, completed });
  // out
  console.log({ newTodo });
  return res.status(200).json({ newTodo });
};
