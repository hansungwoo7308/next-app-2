import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // hashedPassword: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  // },
  // role: {
  //   type: String,
  //   default: "user",
  //   required: true,
  // },
  // image: {
  //   type: String,
  // },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "user",
//     required: true,
//   },
//   //   roles: {
//   //     User: {
//   //       type: Number,
//   //       default: 2001,
//   //     },
//   //     Editor: Number,
//   //     Admin: Number,
//   //   },
//   // refreshToken: [String],
// });

// // module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
// export default mongoose.models?.User || mongoose.model("User", userSchema);
