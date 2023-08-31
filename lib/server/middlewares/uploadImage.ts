import { cloudinary } from "lib/server/utils/cloudinary";
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
