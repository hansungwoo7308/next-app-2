import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    // server로부터 채워지는 데이터
    // hashedPassword: {
    //   type: String,
    //   required: true,
    //   minlength: 5,
    // },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

//   roles: {
//     User: {
//       type: Number,
//       default: 2001,
//     },
//     Editor: Number,
//     Admin: Number,
//   },
// refreshToken: [String],
