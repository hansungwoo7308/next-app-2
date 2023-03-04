import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

// console.log("userSchema : ", userSchema);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
// module.exports = mongoose.model("User", userSchema);
