import connectDB from "lib/server/config/connectDB";
import { errors } from "lib/server/middlewares/errors";
import { createRouter } from "next-connect";
import { isAuthenticated, authorizeRoles } from "lib/server/middlewares/auth";
import { uploadImage } from "lib/server/middlewares/uploadImage";
import { createProduct } from "lib/server/controllers/productController";
import multer from "multer";
import { PageConfig } from "next";
connectDB();
const router = createRouter();
// const upload: any = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, callback) {
//       console.log({ file });
//       callback(null, "public/uploads");
//     },
//     filename: function (req, file, callback) {
//       console.log({ filefile: file });
//       callback(null, new Date().toISOString() + "-" + file.originalname);
//     },
//   }),
//   limits: {
//     fileSize: 1024 * 1024 * 15, // 최대 5MB 파일 크기 제한
//   },
//   fileFilter: (req, file, callback) => {
//     callback(new Error("askdhaldkl"));
//   },
// });
// const uploadMiddleware: any = upload.array("images");
const uploadMiddleware: any = multer().array("images");
router
  .use(uploadMiddleware)
  // .use(async (req: any, res: any, next: any) => {
  //   await new Promise((resolve) => {
  //     // you may use any other multer function
  //     // const upload = multer().array("images");
  //     // const upload = multer().any();
  //     //use resolve() instead of next()
  //     // upload(req, res, resolve);
  //     const upload = multer().array("images");
  //     upload(req, res, resolve);
  //   });
  //   await next();
  // })
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
    // console.log({ files: req.files });
    await next();
  });
// router
//   // .use(upload.array("images"))
//   //
//   .use(async (req: any, res: any, next: any) => {
//     console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
//     console.log({ files: req.files });
//     await next();
//   });
// .use(async (req: any, res, next) => {
//   console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
//   await next();
//   // console.log({ cloudinary1: cloudinary.config() });
//   // console.log({ cloudinary2: cloudinary.v2.config() });
//   // console.log({ cloudinaryV1: Object.keys(cloudinary) });
//   // console.log({ cloudinaryV2: Object.keys(cloudinary.v2) });
//   // console.log({ props: Object.keys(req) });
//   // console.log({ body, files, preview });
//   // throw new Error("Just");
//   // const { test, images, newImages } = req.body;
//   // if (newImages.length) {
//   //   console.log("No No No");
//   //   throw new Error("No images");
//   // }
// })
// .use(isAuthenticated, authorizeRoles(["admin"]))
// .use(uploadImage)
router.post((req: any, res: any) => {
  console.log({ files: req.files });
  res.status(200).json({ message: "aaa" });
}); // R
// .post(createProduct); // R
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
export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,

    // bodyParser: {
    //   // sizeLimit: "13mb", // Set desired value here
    // },
    // responseLimit: false,
    // bodyParser: true,
  },
};
