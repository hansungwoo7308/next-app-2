import connectDB from "lib/server/config/connectDB";
import { getUsers } from "lib/server/controllers/userConrollers";
import { handleErrors } from "lib/server/middlewares/handleErrors";
import { isAuthenticated } from "lib/server/middlewares/isAuthenticated";
import { createRouter } from "next-connect";
console.log("\x1b[32m\n[api/v2/user]");
// connect to db
connectDB();
// create the router
const router = createRouter();
// set the router
router.use(isAuthenticated).post(getUsers);
const options: any = { onError: handleErrors };
// out
export default router.handler(options);
