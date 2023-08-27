import connectDB from "lib/server/config/connectDB";
import { signupUser } from "lib/server/controllers/authControllers";
import { errors } from "lib/server/middlewares/errors";
import { createRouter } from "next-connect";
console.log("\x1b[32m\n[api/auth/signup]");
// connect to db
connectDB();
// create the router
const router = createRouter();
// set the router
router.post(signupUser);
const options: any = { onError: errors };
// out
export default router.handler(options);
