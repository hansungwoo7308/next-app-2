import connectDB from "lib/server/config/connectDB";
import { deleteUser, getUsers, updateUser } from "lib/server/controllers/userConrollers";
import { errors } from "lib/server/middlewares/errors";
import { authorizeRoles, isAuthenticated } from "lib/server/middlewares/authMiddlewares";
import { createRouter } from "next-connect";
// connect to db
connectDB();
// create the router
const router = createRouter();
// set the router
router.use(async (req, res, next) => {
  console.log("\x1b[32m\n[api/v2/user]");
  return next();
});
router.use(isAuthenticated, authorizeRoles(["admin"])).get(getUsers); // R
router.use(isAuthenticated).patch(updateUser); // U
router.use(isAuthenticated).delete(deleteUser); // D

// router.get((req: any, res: any) => {
//   res.status(200).json("aaa");
// });
const options: any = {
  onError: (err: any, req: any, res: any) => {
    // console.error(err.stack);
    // res.status(err.statusCode || 500).end(err.message);
    console.log({ err });
    res.status(400).json({ message: err.message });
  },
};
// out
export default router.handler(options);
