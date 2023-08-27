import cloudinary from "cloudinary";

const uploads = (file: any, folder: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      (result: any) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }

      // {
      //   resource_type: "auto",
      //   folder: folder,
      // }
    );
  });
};

// export { cloudinary, uploadImage };
export { cloudinary };
