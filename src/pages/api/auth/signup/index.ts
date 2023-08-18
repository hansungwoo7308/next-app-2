import connectDB from "lib/server/config/connectDB";
import { signupUser } from "lib/server/controllers/authControllers";
import { handleErrors } from "lib/server/middlewares/handleErrors";
import { createRouter } from "next-connect";
console.log("\x1b[32m\n[api/v2/products]");
// connect to db
connectDB();
// create the router
const router = createRouter();
// set the router
router.post(signupUser);
const options: any = { onError: handleErrors };
// out
export default router.handler(options);
