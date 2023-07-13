// import Head from 'next/head'
// import {useState, useContext, useEffect} from 'react'
// import {useRouter} from 'next/router'
// import {DataContext} from '../../store/GlobalState'
// import {imageUpload} from '../../utils/imageUpload'
// import {postData, getData, putData} from '../../utils/fetchData'
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useForm } from "react-hook-form";
import Image from "next/image";
export default function ProductsManager() {
  //   const initialState = {
  //     title: "",
  //     price: 0,
  //     inStock: 0,
  //     description: "",
  //     content: "",
  //     category: "",
  //   };
  //   const [product, setProduct] = useState(initialState);
  //   const { title, price, inStock, description, content, category } = product;
  const [images, setImages]: any = useState([]);
  // const {state, dispatch} = useContext(DataContext)
  // const {categories, auth} = state
  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const createProduct = async (data: any) => {
    console.log("data : ", data);
  };
  // useEffect(() => {
  //     if(id){
  //         setOnEdit(true)
  //         getData(`product/${id}`).then(res => {
  //             setProduct(res.product)
  //             setImages(res.product.images)
  //         })
  //     }else{
  //         setOnEdit(false)
  //         setProduct(initialState)
  //         setImages([])
  //     }
  // },[id])

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

  // const handleSubmit = async(e) => {
  //     e.preventDefault()
  //     if(auth.user.role !== 'admin')
  //     return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

  //     if(!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
  //     return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

  //     dispatch({type: 'NOTIFY', payload: {loading: true}})
  //     let media = []
  //     const imgNewURL = images.filter(img => !img.url)
  //     const imgOldURL = images.filter(img => img.url)

  //     if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

  //     let res;
  //     if(onEdit){
  //         res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
  //         if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
  //     }else{
  //         res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
  //         if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
  //     }

  //     return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

  // }
  // console.log("images : ", images);
  return (
    <Main>
      <Head>
        <title>Products Manager</title>
      </Head>
      <section>
        <div>
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="upload-images">
              <h1>Product Images</h1>
              <div className="images">
                {images.map((image: any, index: any) => (
                  <div key={index} className={`image ${index === 0 && "thumbnail"}`}>
                    <Image
                      src={image.url ? image.url : URL.createObjectURL(image)}
                      alt={image.url}
                      width={50}
                      height={50}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const filteredImages = images.filter((v: any, i: any) => i !== index);
                        setImages(filteredImages);
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
                {...register("product-images")}
                type="file"
                multiple
                accept="image/*"
                onChange={(e: any) => {
                  setImages([...e.target.files]);
                  // [...e.target.files].forEach((file) => {
                  //   console.log("file : ", file);
                  // });
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
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select {...register("category", { required: true })} id="category">
                <option value="all">All Products</option>
                {
                  // categories.map(item => (
                  //     <option key={item._id} value={item._id}>
                  //         {item.name}
                  //     </option>
                  // ))
                }
              </select>
            </div>
            <input {...register("title", { required: true })} type="text" placeholder="Title" />
            <input {...register("price", { required: true })} type="number" placeholder="Price" />
            <input
              {...register("inStock", { required: true })}
              type="number"
              placeholder="inStock"
            />
            <textarea
              {...register("description", { required: true })}
              cols={30}
              rows={4}
              placeholder="Description"
            />
            <textarea
              {...register("content", { required: true })}
              cols={30}
              rows={6}
              placeholder="Content"
            />
            <button type="submit">{onEdit ? "Update" : "Create"}</button>
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
        border: 2px solid green;
      }
      button {
        align-self: flex-end;
      }
      .upload-images {
        .images {
          border: 2px solid hotpink;
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
