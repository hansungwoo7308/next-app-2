import { getData, postData, putData } from "lib/client/utils/fetchData";
import { setLoading } from "lib/client/store/loadingSlice";
import { uploadImage } from "lib/public/uploadImage";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import Head from "next/head";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
type FormValue = {
  title: string; //name
  description: string;
  price: number;
  inStock: number; //stock
  category: string;

  content: string;
  images: [];
};
export default function ProductManager() {
  // store (external)
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const loading = useSelector((store: any) => store.loading);
  const dispatch = useDispatch();
  // state (internal)
  const [mode, setMode] = useState(""); // button mode : create or update
  const [product, setProduct]: any = useState({});
  const [images, setImages]: any = useState([]);
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, getValues, reset, formState, control } =
    useForm();
  const submit = async (data: any) => {
    console.log("data : ", data);
    // checkValidation
    if (images.length === 0) return toast.error("Please fill the image field.");
    if (data.category === "all") return toast.error("Please fill the category field.");
    // set the formData
    const formData: any = new FormData();
    for (let image of images) formData.append("images", image);
    for (let key in data) formData.append(key, data[key]);
    // create
    try {
      dispatch(setLoading(true));
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/api/v2/products",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      });
      // out
      logResponse(response);
      dispatch(setLoading(false));
      toast.success("Uploading Completed");
      // router.push("/commerce/product");
    } catch (error: any) {
      console.log({ error });
    }
  };
  useEffect(() => {
    console.log({ images });
  }, [images]);
  return (
    <Box>
      <div className="product-manager">
        <h1>Product Manager</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="images">
            <div className="preview-images-outer">
              <div className="preview-images">
                {images.map((image: any, index: any) => (
                  <div key={image.id} className={`image ${index === 0 && "thumbnail-image"}`}>
                    <Image
                      src={image.url || image.secure_url || URL.createObjectURL(image)}
                      alt={image.url || image.secure_url || URL.createObjectURL(image)}
                      width={100}
                      height={100}
                    />
                    <button // delete button
                      onClick={(e) => {
                        e.preventDefault();
                        const filteredImages = images.filter((v: any, i: any) => i !== index);
                        // console.log(filteredImages);
                        setImages(filteredImages);
                        setValue("images", filteredImages);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label className="image-uploader">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e: any) => {
                  // const files = Array.from(e.target.files);
                  // files.map(async (file: any) => {
                  //   const encodedFile = await convertBase64(file);
                  //   setImages((state: any) => [...state, file]);
                  //   setEncodedImages((state: any) => [...state, encodedFile]);
                  // });
                  // const files = e.target.files;
                  // const newImages = e.target.files;
                  const newImages = Array.from(e.target.files);
                  const changedImages: any = [...images, ...newImages];
                  setImages(changedImages);
                  // changedImages.map(async (changedImage: any) => {
                  //   const encodedImage = await convertBase64(changedImage);
                  //   setEncodedImages((state: any) => [...state, encodedImage]);
                  // });
                  // setValue("images", changedImages);
                }}
              />
            </label>
          </div>
          {/* {images.map((img, index) => (
                  <div key={index} className="file_img my-1">
                    <img
                      src={img.url ? img.url : URL.createObjectURL(img)}
                      alt=""
                      className="img-thumbnail rounded"
                    />

                    <span onClick={() => deleteImage(index)}>X</span>
                  </div>
                ))} */}
          <label className="category">
            <span>Category</span>
            <select {...register("category", { required: true })} id="category">
              <option value="all">All Products</option>
              <option value="food">Food</option>
              <option value="sports">Sports</option>
              <option value="5faa35a88fdff228384d51d8">5faa35a88fdff228384d51d8</option>
              {
                // categories.map(item => (
                //     <option key={item._id} value={item._id}>
                //         {item.name}
                //     </option>
                // ))
              }
            </select>
          </label>
          <label className="title">
            <input
              {...register("title", {
                required: true,
                // setValueAs: (value) => value,
                // validate: {
                //   emailAvailable: async (value): Promise<any> => {
                //     const response = await getData(`product/${id}`);
                //     const { title, price, inStock, description, content, category, images } =
                //       response.data.product;
                //     // return "aaa";
                //   },
                // },
              })}
              type="text"
              placeholder="Title"
              defaultValue={product.title}
            />
          </label>
          <label className="price">
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              defaultValue={product.price}
            />
          </label>
          <label className="inStock">
            <input
              {...register("inStock", { required: true })}
              type="number"
              placeholder="inStock"
              defaultValue={product.inStock}
            />
          </label>
          <label className="description">
            <textarea
              {...register("description", { required: true })}
              cols={30}
              rows={4}
              placeholder="Description"
              defaultValue={product.description}
            />
          </label>
          <label className="content">
            <textarea
              {...register("content", { required: true })}
              cols={30}
              rows={6}
              placeholder="Content"
              defaultValue={product.content}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Uploading" : mode}
          </button>
        </form>
      </div>
    </Box>
  );
}
const Box = styled.div`
  .product-manager {
    /* width: 50%; */
    /* background-color: #000; */
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      button {
        align-self: flex-end;
      }
      .images {
        border: 2px solid;
        padding: 1rem;
      }
      .preview-images-outer {
        overflow-x: scroll;
      }
      .preview-images {
        width: fit-content;
        display: flex;
        gap: 1rem;
        padding: 1rem;
        .thumbnail-image {
          border: 5px solid coral;
        }
        .image {
          position: relative;
          width: 10rem;
          height: 10rem;
          border: 2px solid;
          button {
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 0.3rem;
            right: 0.3rem;
            background-color: #fff;
            color: #000;
            border: 2px solid;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .image-uploader {
      }
      .category {
        border: 2px solid blue;
      }
    }
  }
`;
