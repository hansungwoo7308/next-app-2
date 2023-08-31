import connectDB from "lib/server/config/connectDB";
import { errors } from "lib/server/middlewares/errors";
import { isAuthenticated, authorizeRoles } from "lib/server/middlewares/auth";
import { uploadImagesToServer, uploadImagesToCloudinary } from "lib/server/middlewares/uploadImage";
import { createProduct } from "lib/server/controllers/productController";
import { createRouter } from "next-connect";
import { PageConfig } from "next";
// set the database and router
connectDB();
const router = createRouter();
router
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
    await next();
  })
  .use(uploadImagesToServer, async (req: any, res: any, next: any) => {
    console.log(`\n<uploadImagesToServer>`);
    console.log({ files: req.files, body: req.body });
    await next();
  })
  .post(uploadImagesToCloudinary) // R
  .post(createProduct); // R
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "public/uploads");
//   },
//   filename: function (req, file, callback) {
//     callback(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const uploadImagesToServer: any = multer({ storage }).array("images");
// const uploadImagesToServer: any = multer({ dest: "public/uploads" }).array("images");
// const uploadImagesToServer: any = multer().array("images");
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
// .post(async (req: any, res: any, next: any) => {
//   console.log(`\x1b[32m\n<uploadImagesToCloudinary>`);
//   // get
//   const { files } = req;
//   // set
//   cloudinary.v2.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   const options: UploadApiOptions = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//     folder: "next-app-2",
//   };
//   // 1) upload : general Promise (비동기 업로드 : 로그를 한번에 보지 못하고, 처리된 순서대로 받게 된다.)
//   // files.map(async (file: any) => {
//   //   const result = await cloudinary.v2.uploader.upload(file.path, options);
//   //   console.log({ cloudinaryUploadData: result });
//   // });
//   // 2) upload : Promise.all (비동기 업로드 : 로그 결과를 한번에 일괄적으로 받게 된다.)
//   let uploadPromises: any = [];
//   files.map(async (file: any) => {
//     // keep the promise in uploadPromises
//     // Promise.all을 사용하기 위해서 프라미스들을 저장한다.
//     uploadPromises.push(cloudinary.v2.uploader.upload(file.path, options));
//     // console.log({ cloudinaryUploadData: result });
//   });
//   const result = await Promise.all(uploadPromises);
//   console.log({ promiseAllResult: result });
//   // add images to body
//   req.body.images = result.map((item: any) => ({ url: item.url, secure_url: item.secure_url }));
//   // console.log({ body: req.body });
//   // return res.status(200).json({ message: "ccc" });
//   await next();
// }) // R

// .use(isAuthenticated, authorizeRoles(["admin"]))
// .use(uploadImage)
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
export default router.handler(options);
