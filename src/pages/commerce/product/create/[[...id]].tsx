// import Head from 'next/head'
// import {useState, useContext, useEffect} from 'react'
// import {useRouter} from 'next/router'
// import {DataContext} from '../../store/GlobalState'
// import {imageUpload} from '../../utils/imageUpload'
// import {postData, getData, putData} from '../../utils/fetchData'
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
import { setLoading } from "lib/client/store/notifySlice";
import { getData, postData, putData } from "lib/client/utils/fetchData";
export default function Page() {
  // get the store
  const { auth }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  // set the state
  const [product, setProduct]: any = useState({});
  const [mode, setMode] = useState("");
  // get the router query string
  const router = useRouter();
  const { id } = router.query;
  // get the react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const { fields } = useFieldArray({ name: "images", control });
  const createProduct = async (data: any) => {
    console.log("data : ", data);
    if (auth.role !== "admin") return;
    if (mode === "create") {
      try {
        dispatch(setLoading(true));
        const { images } = data;
        const uploadedImages = await uploadImage(images);
        console.log("uploadedImages : ", uploadedImages);
        const response = await postData(
          "product",
          { ...data, images: uploadedImages },
          auth.accessToken
        );
        logResponse(response);
        dispatch(setLoading(false));
      } catch (error) {
        // logError(error);
        console.log("createProduct error : ", error);
        dispatch(setLoading(false));
      }
    }
    if (mode === "update") {
      try {
        dispatch(setLoading(true));
        const { images } = data;
        // console.log("update images : ", images);
        // const uploadedImages = await uploadImage(images);
        // console.log("uploadedImages : ", uploadedImages);
        // const response = await putData(
        //   `product/${id}`,
        //   { ...product, images: uploadedImages },
        //   auth.accessToken
        // );
        // logResponse(response);
        dispatch(setLoading(false));
      } catch (error) {
        // logError(error);
        console.log("createProduct error : ", error);
        dispatch(setLoading(false));
      }
    }
  };
  useEffect(() => {
    if (!id) setMode("create");
    setMode("update");
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getData(`product/${id}`);
        const { title, price, inStock, description, content, category, images } =
          response.data.product;
        const product: any = { title, price, inStock, description, content, category, images };
        logResponse(response);
        // setProduct(product);

        for (let key in product) {
          // console.log(`${key} : ${product[key]}`);
          // 객체로 된 images를 어떻게 배열로 바꾸지?...
          // if (key === "images") setValue(`${key}`, [...value]);
          // else setValue(`${key}`, value);
          setValue(`${key}`, product[key]);
        }
        dispatch(setLoading(false));
      } catch (error) {
        // logError(error);
        console.log("error : ", error);
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    console.log("fields : ", fields);
  }, [fields]);
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
        <div>
          <h1>Product Manager</h1>
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="upload-images">
              <p>Images</p>
              <div className="images">
                {/* {product.images &&
                  product.images.map((image: any, index: any) => (
                    <div key={index} className={`image ${index === 0 && "thumbnail"}`}>
                      <Image
                        src={
                          image.url
                            ? image.url
                            : image.secure_url
                            ? image.secure_url
                            : URL.createObjectURL(image)
                        }
                        alt={image.url}
                        width={200}
                        height={200}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const filteredImages = product.images.filter(
                            (v: any, i: any) => i !== index
                          );
                          setProduct({ ...product, images: filteredImages });
                          // setImages(filteredImages);
                          // const splicedImages = [...images].splice(index, 1);
                          // setImages(splicedImages);
                        }}
                      >
                        x
                      </button>
                    </div>
                  ))} */}
                {fields.map((field: any, index: any) => (
                  <div key={field.id} className={`image ${index === 0 && "thumbnail"}`}>
                    <Image
                      src={field.url || field.secure_url}
                      alt={field.url || field.secure_url}
                      width={100}
                      height={100}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const filteredImages = fields.filter((v: any, i: any) => i !== index);
                        setValue("images", filteredImages);
                        // setImages(filteredImages);
                        // const splicedImages = [...images].splice(index, 1);
                        // setImages(splicedImages);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <input
                {...register("images", {
                  required: true,
                })}
                type="file"
                multiple
                accept="image/*"
                // onChange={(e: any) => {
                //   // setImages([...e.target.files]);
                //   setProduct({ ...product, images: [...product.images, ...e.target.files] });
                //   // [...e.target.files].forEach((file) => {
                //   //   console.log("file : ", file);
                //   // });
                // }}
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
            </div>
            <div>
              <label htmlFor="category">Category</label>
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
            </div>
            <input
              {...register("title", {
                required: true,
                setValueAs: (value) => value,
              })}
              type="text"
              placeholder="Title"
              // defaultValue={product && product.title}
            />
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              // defaultValue={product && product.price}
            />
            <input
              {...register("inStock", { required: true })}
              type="number"
              placeholder="inStock"
              // defaultValue={product && product.inStock}
            />
            <textarea
              {...register("description", { required: true })}
              cols={30}
              rows={4}
              placeholder="Description"
              // defaultValue={product && product.description}
            />
            <textarea
              {...register("content", { required: true })}
              cols={30}
              rows={6}
              placeholder="Content"
              // defaultValue={product && product.content}
            />
            <button type="submit">{mode}</button>
          </form>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section > div {
    width: 50%;
    background-color: #000;
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      /* align-items: center; */
      > * {
        /* border: 2px solid green; */
      }
      button {
        align-self: flex-end;
      }
      .upload-images {
        overflow-x: scroll;
        border: 2px solid;
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
    }
  }
`;
