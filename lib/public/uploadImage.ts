import axios from "axios";
export const uploadImage = async (images: any) => {
  // upload image to cloudinary
  console.log("\x1b[33m\n[public/uploadImage]");
  // console.log("images : ", images);
  let array = [];
  for (const item of images) {
    const formData: any = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.CLOUD_NAME);
    try {
      // upload
      const response = await axios({
        method: "POST",
        url: process.env.CLOUD_API_BASE_URL,
        data: formData,
      });
      const uploadedImage = response.data;
      const { public_id, secure_url } = uploadedImage;
      // keep
      array.push({ public_id, secure_url });
      console.log({ uploadedImage });
    } catch (error) {
      console.log({ "uploadImage/error": error });
    }
  }
  // out
  return array;
};
