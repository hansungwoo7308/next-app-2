import connectDB from "lib/server/config/connectDB";
import { getUsers, updateUser } from "lib/server/controllers/userConrollers";
import { handleErrors } from "lib/server/middlewares/handleErrors";
import { isAuthenticated } from "lib/server/middlewares/isAuthenticated";
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
router.use(isAuthenticated).get(getUsers);
router.use(isAuthenticated).patch(updateUser);

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
