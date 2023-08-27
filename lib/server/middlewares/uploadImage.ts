import { cloudinary } from "lib/server/utils/cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// create by image url path
// client로부터 image file은 받지 못한다.
//
export const uploadImage = async (req: any, res: any, next: any) => {
  console.log("\x1b[32m\n<middleware/uploadImage>");
  // const { files } = req;
  // console.log({ files });

  // imagePath : base64 image data
  const { imageBase64 } = req.body;
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(imageBase64, options);
    // pull out
    const { url, secure_url } = result;
    const image = { url, secure_url };
    req.body.image = image;
    console.log({ "req.body.image": image });
    return await next();
  } catch (error) {
    console.error(error);
    await next();
  }
};
