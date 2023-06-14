import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  // client로부터 채워지는 데이터
  username: {
    type: String,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // server로부터 채워지는 데이터
  // id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    // required: true,
  },
  // hashedPassword: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  // },
  // accessToken: {
  //   type: String,
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
