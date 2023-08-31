import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "lib/public/uploadImage";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { getData, postData, putData } from "lib/client/utils/fetchData";
import { DevTool } from "@hookform/devtools";
import { setLoading } from "lib/client/store/loadingSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
type FormValue = {
  title: string; //name
  description: string;
  // seller
  price: number;
  inStock: number; //stock
  category: string;

  content: string;
  images: [];
};
export default function Page() {
  // store
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const loading = useSelector((store: any) => store.loading);
  const dispatch = useDispatch();
  // state
  const [mode, setMode] = useState(""); // button mode : create or update
  const [product, setProduct]: any = useState({});
  const [images, setImages]: any = useState([]);
  // const [encodedImages, setEncodedImages]: any = useState([]);
  // query : product id
  const router = useRouter();
  const { id } = router.query;
  // form
  const { register, handleSubmit, watch, setValue, getValues, reset, formState, control } =
    useForm();
  // {
  //   defaultValues: async () => {
  //     if (!id) setMode("create");
  //     setMode("update");
  //     try {
  //       dispatch(setLoading(true));
  //       const response = await getData(`product/${id}`);
  //       const { product } = response.data;
  //       logResponse(response);
  //       setImages(product.images);
  //       dispatch(setLoading(false));
  //       return { ...product };
  //       // return { ...product, images: product.images };
  //     } catch (error) {
  //       console.log("error : ", error);
  //       dispatch(setLoading(false));
  //     }
  //   },
  // }
  // } = useForm<FormValue>();
  // const { errors, isSubmitSuccessful } = formState;
  // const watchImages = watch("images");
  // const { fields, append, remove }: any = useFieldArray({ name: "images", control }); // for array field used to form

  // const uploadImage = async (files: any) => {};
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };
  const submit = async (data: any) => {
    // console.log("data : ", data);
    // validation
    if (images.length === 0) return toast.error("Please fill the image field.");
    if (data.category === "all") return toast.error("Please fill the category field.");
    // create
    if (mode === "create") {
      try {
        // dispatch(setLoading(true));
        // get
        // const { images } = data;
        // direct upload
        const uploadedImages = await uploadImage(images);
        const payload = { ...data, images: uploadedImages };
        console.log({ payload });
        // create a product
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/api/v2/products",
          data: payload,
          // withCredentials: true,
        });
        // out
        logResponse(response);
        dispatch(setLoading(false));
        toast.success("Uploading Completed");
        router.push("/commerce/product");
      } catch (error) {
        logError(error);
        dispatch(setLoading(false));
      }
    }
    // if (mode === "update") {
    //   try {
    //     dispatch(setLoading(true));
    //     // get the images
    //     const { images } = data;
    //     // url를 가진 이미지와 url를 가지지 못한 이미지를 분류한다.
    //     const urlImages = images.filter((image: any) => image.url || image.secure_url);
    //     const pendingImages = images.filter((image: any) => !(image.url || image.secure_url));
    //     console.log("pendingImages : ", pendingImages);
    //     // url를 부여한 이미지를 생성한다.
    //     const uploadedImages = await uploadImage(pendingImages);
    //     // console.log("uploadedImages : ", uploadedImages);
    //     // 통합(integration)
    //     const payload = [...urlImages, ...uploadedImages];
    //     // update the product
    //     const response = await putData(
    //       `product/${id}`,
    //       { ...data, images: payload },
    //       auth.accessToken
    //     );
    //     // output
    //     logResponse(response);
    //     dispatch(setLoading(false));
    //   } catch (error) {
    //     // logError(error);
    //     console.log("submit error : ", error);
    //     dispatch(setLoading(false));
    //   }
    // }
  };
  const submitByBase64 = async (data: any) => {
    dispatch(setLoading(true));

    // const { category, content, description, inStock, price, title } = data;
    console.log("data : ", data);
    // console.log({ category: data.category });
    // return;
    const checkValidation = () => {
      // checkValidation
      if (images.length === 0) return toast.error("Please fill the image field.");
      if (data.category === "all") return toast.error("Please fill the category field.");
    };
    const convertBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          console.log({ result: fileReader });
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    const createSingleImage = async () => {
      if (images.length === 1) {
        // convert to base64 string
        const imageBase64 = await convertBase64(images[0]);
        // create
        const response = await axios({
          method: "POST",
          url: "http://localhost:3001/api/v2/products",
          data: { imageBase64 },
          // withCredentials: true,
        });
        console.log({ response });
        // out
        logResponse(response);
        dispatch(setLoading(false));
        toast.success("Uploading Completed");
        // router.push("/commerce/product");
      }
    };
    const createMultipleImages = async () => {
      // convert to base64 string
      // const imagesBase64: any = [];
      // for (let image of images) {
      //   const imageBase64 = await convertBase64(image);
      //   imagesBase64.push(imageBase64);
      // }
      // encodedImages.map((encodedImage: any) => {
      //   formData.append("images", encodedImage);
      // });

      const formData: any = new FormData();
      images.map((image: any) => formData.append("images", image));
      // images.forEach((image: any) => formData.append("images", image));
      for (let key in data) {
        // console.log({ key, value: data[key] });
        formData.append(key, data[key]);
      }

      // create
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3001/api/v2/products",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
          // data: { ...data, formData },
        });
        // out
        logResponse(response);
        dispatch(setLoading(false));
        toast.success("Uploading Completed");
        // router.push("/commerce/product");
      } catch (error: any) {
        console.log({ eeeeeeerrrrr: error });
        console.log({ test: error.config.data.getAll() });
      }
    };

    checkValidation();
    // dispatch(setLoading(true));
    if (mode === "create") {
      try {
        if (images.length === 1) return await createSingleImage();
        await createMultipleImages();
      } catch (error) {
        // logError(error);
        console.log({ error });
        dispatch(setLoading(false));
      }
    }
  };
  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      // get the product by id
      const response = await getData(`commerce/product/${id}`);
      const { title, price, inStock, description, content, category, images } =
        response.data.product;
      const product: any = { title, price, inStock, description, content, category, images };
      logResponse(response);
      // set the state
      setProduct(product);
      setImages(images);
      for (let key in product) {
        setValue(`${key}`, product[key]);
        // 객체로 된 images를 어떻게 배열로 바꾸지?...
        // else setValue(`${key}`, value);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log({ "fetchData/error": error });
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    // id ? setMode("update") : setMode("create");
    if (!id) return setMode("create");
    console.log({ id });
    setMode("update");
    fetchData();
  }, [id]);
  // useEffect(() => {
  //   console.log("images : ", images);
  // }, [images]);
  // useEffect(() => {
  //   if (isSubmitSuccessful) reset();
  // }, [isSubmitSuccessful, reset]);
  // const handleUploadInput = (e:any) => {
  //     // dispatch({type: 'NOTIFY', payload: {}})
  //     let newImages = []
  //     let num = 0
  //     let err = ''
  //     const files = [...e.target.files]

  //     if(files.length === 0)
  //     return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

  //     files.forEach(file => {
  //         if(file.size > 1024 * 1024)
  //         return err = 'The largest image size is 1mb'

  //         if(file.type !== 'image/jpeg' && file.type !== 'image/png')
  //         return err = 'Image format is incorrect.'

  //         num += 1;
  //         if(num <= 5) newImages.push(file)
  //         return newImages;
  //     })

  //     if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

  //     const imgCount = images.length
  //     if(imgCount + newImages.length > 5)
  //     return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
  //     setImages([...images, ...newImages])
  // }

  // const deleteImage = index => {
  //     const newArr = [...images]
  //     newArr.splice(index, 1)
  //     setImages(newArr)
  // }

  // const asdasd = async (e: any) => {
  //   let media = [];
  //   const imgNewURL = images.filter((img) => !img.url);
  //   const imgOldURL = images.filter((img) => img.url);
  //   if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
  //   let res;
  //   // if (edit) {
  //   //   res = await putData(
  //   //     `product/${id}`,
  //   //     { ...product, images: [...imgOldURL, ...media] },
  //   //     auth.token
  //   //   );
  //   //   if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  //   // } else {
  //   //   res = await postData("product", { ...product, images: [...imgOldURL, ...media] }, auth.token);
  //   //   if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  //   // }
  //   // return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  // };
  useEffect(() => {
    console.log({ images });
  }, [images]);
  return (
    <Main>
      <Head>
        <title>Products Manager</title>
      </Head>
      <section>
        <div className="product-manager">
          <h1>Product Manager</h1>
          <form
            onSubmit={
              handleSubmit(submitByBase64)
              // handleSubmit(submit)
            }
          >
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
      </section>
      {/* <DevTool control={control} /> */}
    </Main>
  );
}
const Main = styled(PublicMain)`
  .product-manager {
    width: 50%;
    background-color: #000;
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
