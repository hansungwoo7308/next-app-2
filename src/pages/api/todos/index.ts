import Todo from "lib/core/model/Todo";
// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export default async function handler(req: any, res: any) {
  console.log("");

  // set
  const URI: any = process.env.MONGODB_URI;
  const OPTIONS: any = {
    dbName: "bananaDB",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // bufferCommands: false,
  };
  // const client = new MongoClient(URI, OPTIONS);

  // connect
  try {
    // connect to db
    // await client.connect();
    await mongoose.connect(URI, OPTIONS);
    // get the collection data
    // const database = client.db("bananaDB");
    // const collection = client.db().collection("posts");
    // const result = await collection.find({}).toArray();
    // console.log("result : ", result);
  } catch (error) {
    console.log("connection error : ", error);
  }

  // GET
  if (req.method === "GET") {
    console.log("/api/todos/ [GET]");
    const todos: any = await Todo.find({});
    res.status(200).json(todos);
    // const todos: any = await Todo.find({}).exec();
    // console.log("todos : ", todos);
  }

  // get
  // if (req.method === "GET") {
  //   console.log("req.method === 'GET'");
  //   try {
  //     console.log("Post.find({})");
  //     const result = await Todo.find({});
  //     console.log("result : ", result);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log("getTodos error : ", error);
  //     res.status(400).json(error);
  //   }
  // }

  // POST
  if (req.method === "POST") {
    console.log("/api/todos/ [POST]");
    console.log(req.body);
    const duplicatedData = await Todo.findOne({ title: req.body.title });
    if (duplicatedData)
      return res.status(404).json({ message: "duplicatedData exist." });
    await Todo.create(req.body);
    res.status(200).json(req.body);
  }

  console.log("");
}