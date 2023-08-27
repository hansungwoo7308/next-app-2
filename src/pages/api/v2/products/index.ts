import connectDB from "lib/server/config/connectDB";
import { errors } from "lib/server/middlewares/errors";
import { createRouter } from "next-connect";
import { isAuthenticated, authorizeRoles } from "lib/server/middlewares/auth";
import { uploadImage } from "lib/server/middlewares/uploadImage";
import { createProduct } from "lib/server/controllers/productController";
import multer from "multer";
// connect to db
connectDB();
// create the router
const router = createRouter();
// get the file upload helper
// const upload: any = multer({});
// console.log({ "upload.props": Object.keys(upload) });

// set the router
router
  .use(async (req: any, res, next) => {
    console.log("\x1b[32m\n[api/v2/products]\n<test>");
    // console.log({ cloudinary1: cloudinary.config() });
    // console.log({ cloudinary2: cloudinary.v2.config() });
    // console.log({ cloudinaryV1: Object.keys(cloudinary) });
    // console.log({ cloudinaryV2: Object.keys(cloudinary.v2) });
    // console.log({ props: Object.keys(req) });
    // console.log({ body, files, preview });
    // throw new Error("Just");
    // const { test, images, newImages } = req.body;
    // if (newImages.length) {
    //   console.log("No No No");
    //   throw new Error("No images");
    // }
    await next();
  })
  .use(isAuthenticated, authorizeRoles(["admin"]))
  // .use(uploadImage)
  .post(createProduct); // R
// .post((req: any, res: any) => {
//   console.log({ "req.body.image": req.body.image });
//   res.status(200).json({ message: "testing..." });
// });
// router.use(isAuthenticated).patch(updateUser); // U
// router.use(isAuthenticated).delete(deleteUser); // D
const options: any = {
  onError: (err: any, req: any, res: any) => {
    // console.error(err.stack);
    // res.status(err.statusCode || 500).end(err.message);
    console.log({ err });
    res.status(400).json({ error: err });
  },
};
// out
export default router.handler(options);
export const config = {
  api: {
    // responseLimit: false,
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
    // bodyParser: false,
  },
};
