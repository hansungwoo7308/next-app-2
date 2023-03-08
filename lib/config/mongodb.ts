// get the modules
import { MongoClient } from "mongodb";
// This approach is taken from
// https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

// check the env
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// set the variables
const MONGODB_URI: string = process.env.MONGODB_URI;
const MONGODB_OPTIONS = {
  dbName: "bananaDB",
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
  // if (!global._mongoClientPromise) {
  //   client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
  //   global._mongoClientPromise = client.connect();
  // }
  // clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  // client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

// console.log("clientPromise : ", clientPromise);

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
