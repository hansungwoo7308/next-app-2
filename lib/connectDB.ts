/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import mongoose from "mongoose";

// check the env
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// typescript as 문법 : compile 시에만 실행
// & bitwise(비트연산) : 피연산자 & 피연산자 = 바이너리 연산결과 => true or false
// typeof globalThis = object
// {mongoose} = object
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;
// console.log("\x1b[33mcached : ", cached);

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // dbName: "bananaDB",
      useUnifiedTopology: true,
      useNewUrlParser: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

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
