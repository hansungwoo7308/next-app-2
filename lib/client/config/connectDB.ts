/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import mongoose from "mongoose";
// check the env
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}
// get the database uri and option
const MONGODB_URI: string = process.env.MONGODB_URI;
const OPTION = {
  dbName: "bananaDB",
  useUnifiedTopology: true,
  useNewUrlParser: true,
  bufferCommands: false,
};
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// typescript as 문법 : compile 시에만 실행
// & bitwise(비트연산) : 피연산자 & 피연산자 = 바이너리 연산결과 => true or false
// typeof globalThis = object
// {mongoose} = object

// global mongoose
// console.log("global.mongoose properties : ", Object.keys(global.mongoose));

// global mongoose.conn
// console.log("global.mongoose.conn : ", global.mongoose.conn);
// console.log(
//   "global.mongoose.conn properties : ",
//   Object.keys(global.mongoose.conn)
// );

// global mongoose.promise
// console.log("global.mongoose.promise : ", global.mongoose.promise);
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;
// console.log("\x1b[33mcached : ", cached);
if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}
export default async function connectDB() {
  // console.log("\x1b[32m\n[DB]:connectDB");
  // cached connection
  if (cached.conn) {
    console.log("cached connection");
    const connections = cached.conn.connections;
    // console.log("cached connections : ", cached.conn.connections);
    // console.log("connections[0].$dbName : ", connections[0].$dbName);
    // console.log("connections[0].models : ", connections[0].models);
    // console.log("cached connections : ", Object.keys(connections[0]));
    // console.log("connections[0] : ", connections[0]);
    // console.log("connections[0].db : ", connections[0].db);
    // console.log("connections[0].collections : ", connections[0].collections);
    // console.log("cached connections : ");
    // console.log("name : ", connections.name);
    // console.log("$dbName : ", connections["bananaDB"]);
    // console.log("collections : ", connections.collections);
    // console.log("models : ", connections.models);
    return cached.conn;
  }
  // new connection
  if (!cached.promise) {
    console.log("new conncection");
    cached.promise = mongoose.connect(MONGODB_URI, OPTION).then((mongoose) => {
      // console.log("new connections : ", mongoose);
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  // console.log("cached.conn : ", cached.conn);
  return cached.conn;
}
// import mongoose from "mongoose";
// const connectDB = async () => {
//   // if (mongoose.connection.readyState >= 1) {
//   //   // console.log(
//   //   //   "\x1b[33mmongoose.connection.db.namespace : ",
//   //   //   mongoose.connection.db.namespace
//   //   // );
//   //   // return mongoose.connection.db;
//   // }
//   try {
//     // const db = await mongoose.createConnection(process.env.DATABASE_URI, {
//     //   useUnifiedTopology: true,
//     //   useNewUrlParser: true,
//     // });
//     // db.on("error", function () {
//     //   console.log("failed to mongoDB.");
//     //   // console.log("mongoDB connection failed.");
//     // });
//     // db.once("open", function () {
//     //   console.log(`${YELLOW}connected to mongoDB 2.${END}`);
//     //   // console.log("mongoDB connection completed.");
//     // });
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "bananaDB",
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log("");
//     console.log(`\x1b[33mConnected to bananaDB\x1b[0m`);
//     console.log("");
//   } catch (error) {
//     console.log("");
//     console.error(`\x1b[31merror : \x1b[0m`, error);
//     console.log("");
//   }
// };

// module.exports = connectDB;
// // // This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// // import mongoose, { ConnectOptions, Mongoose } from "mongoose";
// // // Check URI
// // const uri = process.env.MONGODB_URI || "";
// // if (!process.env.MONGODB_URI) {
// //   throw new Error("Please add your Mongo URI to .env.local");
// // }
// // // Create Connection
// // let dbConnection: Promise<Mongoose>;
// // const options: ConnectOptions = {};
// // if (process.env.NODE_ENV === "development") {
// //   // In development mode, use a global variable so that the value
// //   // is preserved across module reloads caused by HMR (Hot Module Replacement).
// //   if (!(global as any)._mongooseConnect) {
// //     (global as any)._mongooseConnect = mongoose.connect(uri, options);
// //   }
// //   dbConnection = (global as any)._mongooseConnect;
// // } else {
// //   // In production mode, it's best to not use a global variable.
// //   dbConnection = mongoose.connect(uri, options);
// // }
// // // Export a module-scoped MongoClient promise. By doing this in a
// // // separate module, the client can be shared across functions.
// // export default dbConnection;
