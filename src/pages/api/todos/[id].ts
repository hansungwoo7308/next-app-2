import Todo from "lib/core/model/Todo";
import { MongoClient } from "mongodb";
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
  const client = new MongoClient(URI, OPTIONS);
  // connect
  try {
    // connect to db
    await client.connect();
    // get the collection data
    // const database = client.db("bananaDB");
    // const collection = client.db().collection("posts");
    // const result = await collection.find({}).toArray();
    // console.log("result : ", result);
  } catch (error) {
    console.log("connection error : ", error);
  }
  if (req.method === "PATCH") {
    console.log("/api/todos/[id] [PATCH]");
    console.log("req.body : ", req.body);
    const result = await Todo.updateOne(
      {
        _id: req.body._id,
      },
      { completed: req.body.completed }
    );
    console.log("PATCH result : ", result);
    res.status(200).json(req.body);
  }
  if (req.method === "DELETE") {
    console.log("/api/todos/[id] [DELETE]");
    console.log("req.body : ", req.body);
    // console.log("typeof req.body.id : ", typeof req.body.id);
    const result = await Todo.deleteOne({ id: { $in: req.body } });
    console.log("result : ", result);
    res.status(200).json(req.body);
  }
  console.log("");
}
