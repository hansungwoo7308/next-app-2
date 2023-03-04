import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  //   roles: {
  //     User: {
  //       type: Number,
  //       default: 2001,
  //     },
  //     Editor: Number,
  //     Admin: Number,
  //   },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // role: {
  //   type: String,
  //   default: "user",
  // },
  // refreshToken: [String],
});

module.exports = mongoose.models.Test || mongoose.model("Test", testSchema);
