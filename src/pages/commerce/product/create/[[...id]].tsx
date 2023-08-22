import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "lib/client/utils/uploadImage";
import logResponse from "lib/client/log/logResponse";
import logError from "lib/client/log/logError";
import { getData, postData, putData } from "lib/client/utils/fetchData";
import { DevTool } from "@hookform/devtools";
import { setLoading } from "lib/client/store/loadingSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
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
  const dispatch = useDispatch();
  // state
  const [mode, setMode] = useState("");
  const [product, setProduct]: any = useState({});
  const [images, setImages] = useState([]);
  // query
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
  const submit = async (data: any) => {
    console.log("data : ", data);
    if (mode === "create") {
      try {
        dispatch(setLoading(true));
        // upload images
        const { images } = data;
        const uploadedImages = await uploadImage(images);
        console.log("uploadedImages : ", uploadedImages);
        const payload = { ...data, images: uploadedImages };
        // create a product
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/api/v2/products",
          data: payload,
          withCredentials: true,
        });
        // out
        logResponse(response);
        dispatch(setLoading(false));
        router.push("/commerce/product");
      } catch (error) {
        console.log({ "submit-error": error });
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
  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getData(`commerce/product/${id}`);
      const { title, price, inStock, description, content, category, images } =
        response.data.product;
      const product: any = { title, price, inStock, description, content, category, images };
      logResponse(response);
      setProduct(product);
      setImages(images);
      for (let key in product) {
        setValue(`${key}`, product[key]);
        // console.log(`${key} : ${product[key]}`);
        // 객체로 된 images를 어떻게 배열로 바꾸지?...
        // else setValue(`${key}`, value);
      }
      dispatch(setLoading(false));
    } catch (error) {
      // logError(error);
      console.log("error : ", error);
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
  return (
    <Main>
      <Head>
        <title>Products Manager</title>
      </Head>
      <section>
        <div className="product-manager">
          <h1>Product Manager</h1>
          <form onSubmit={handleSubmit(submit)}>
            <label className="upload-images">
              <p>Images</p>
              <div className="images">
                {images.map((image: any, index: any) => (
                  <div key={image.id} className={`image ${index === 0 && "thumbnail"}`}>
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
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e: any) => {
                  let changedImages: any = [...images, ...e.target.files];
                  setImages(changedImages);
                  setValue("images", changedImages);
                }}
              />
              <div>
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
              </div>
            </label>
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
            <button type="submit" disabled={auth.user?.role !== "admin"}>
              {mode}
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
      .upload-images {
        overflow-x: scroll;
        border: 2px solid red;
        .images {
          width: fit-content;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          .thumbnail {
            border: 5px solid coral;
          }
          .image {
            position: relative;
            width: 10rem;
            height: 10rem;
            img {
              /* border: 2px solid lightpink; */
              /* height: initial; */
              /* height: 3rem; */
            }
            button {
              width: 2rem;
              height: 2rem;
              position: absolute;
              top: 0.3rem;
              right: 0.3rem;
              background-color: #fff;
              color: #000;
              border: 2px solid #000;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      .category {
        border: 2px solid blue;
      }
    }
  }
`;
