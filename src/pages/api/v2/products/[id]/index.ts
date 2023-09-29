import connectDB from "lib/server/config/connectDB";
import { deleteProduct } from "lib/server/controllers/productController";
import { authorizeRoles, isAuthenticated } from "lib/server/middlewares/authMiddlewares";
import { createRouter } from "next-connect";
// import {
//   deleteProduct,
//   getProduct,
//   updateProductReview,
// } from "lib/server/controllers/productControllers";
// import { checkRoles, checkAuth } from "lib/server/middlewares/authMiddlewares";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[33m\n[api/v2/products/${req.query.id}]:::[${req.method}]`);
    await next();
  })
  // .get(getProduct)
  // protected routes
  // .use(checkAuth, checkRoles(["user", "admin"]))
  // .patch(updateProductReview)
  .use(isAuthenticated, authorizeRoles(["admin"]))
  .delete(deleteProduct);

export default router.handler();
