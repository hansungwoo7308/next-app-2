import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const db = await mongoose.createConnection(process.env.DATABASE_URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // });

    // db.on("error", function () {
    //   console.log("failed to mongoDB.");
    //   // console.log("mongoDB connection failed.");
    // });
    // db.once("open", function () {
    //   console.log(`${YELLOW}connected to mongoDB 2.${END}`);
    //   // console.log("mongoDB connection completed.");
    // });

    console.log("mongoose.connection.db : ", mongoose.connection.db);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "bananaDB",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("");
    console.log(`\x1b[33mConnected to bananaDB\x1b[0m`);
    console.log("");
  } catch (error) {
    console.log("");
    console.error(`\x1b[31merror : \x1b[0m`, error);
    console.log("");
  }
};

module.exports = connectDB;
