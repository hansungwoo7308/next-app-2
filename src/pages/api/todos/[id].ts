import Todo from "lib/core/model/Todo";
import { MongoClient } from "mongodb";

export default async function handler(req: any, res: any) {
  console.log("");
  console.log("/api/todos/[id]");

  const URI: any = process.env.MONGODB_URI;
  const OPTIONS: any = {
    dbName: "bananaDB",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // bufferCommands: false,
  };
  const client = new MongoClient(URI, OPTIONS);

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

  // PATCH
  if (req.method === "PATCH") {
    console.log(req.body);
    const result = await Todo.updateOne(
      {
        _id: req.body._id,
      },
      { completed: req.body.completed }
    );
    console.log("PATCH result : ", result);
    res.status(200).json(req.body);
  }

  console.log("");
}
