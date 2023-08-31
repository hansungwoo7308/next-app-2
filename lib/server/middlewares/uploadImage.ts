import { UploadApiOptions } from "cloudinary";
import { cloudinary } from "lib/server/utils/cloudinary";
import multer from "multer";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// create by image url path
// client로부터 image file은 받지 못한다.
//
// signle image
export const uploadImage = async (req: any, res: any, next: any) => {
  console.log("\x1b[32m\n<middleware/uploadImage>");
  const { imageBase64, imagesBase64 } = req.body;
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  // single image
  if (imageBase64) {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(imageBase64, options);
    // pull out
    const { url, secure_url } = result;
    const image = { url, secure_url };
    req.body.image = image;
    console.log({ "req.body.image": image });
    return await next();
  }
  // multiple images
  else if (imagesBase64) {
    console.log("........");
    return await next();
  }
};

// upload middleware (cloudinary)
export const uploadImagesToCloudinary = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<uploadImagesToCloudinary>`);
  // get
  const { files } = req;
  // set
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "next-app-2",
  };
  // 1) upload : general Promise (비동기 업로드 : 로그를 한번에 보지 못하고, 처리된 순서대로 받게 된다.)
  // files.map(async (file: any) => {
  //   const result = await cloudinary.v2.uploader.upload(file.path, options);
  //   console.log({ cloudinaryUploadData: result });
  // });
  // 2) upload : Promise.all (비동기 업로드 : 로그 결과를 한번에 일괄적으로 받게 된다.)
  let uploadPromises: any = [];
  files.map(async (file: any) => {
    // keep the promise in uploadPromises
    // Promise.all을 사용하기 위해서 프라미스들을 저장한다.
    uploadPromises.push(cloudinary.v2.uploader.upload(file.path, options));
    // console.log({ cloudinaryUploadData: result });
  });
  const result = await Promise.all(uploadPromises);
  console.log({ promiseAllResult: result });
  // add images to body
  req.body.images = result.map((item: any) => ({ url: item.url, secure_url: item.secure_url }));
  // console.log({ body: req.body });
  // return res.status(200).json({ message: "ccc" });
  await next();
};

// upload middleware (server)
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});
export const uploadImagesToServer: any = multer({ storage }).array("images");
