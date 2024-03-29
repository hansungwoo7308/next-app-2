import { addToCart } from "lib/client/store/cartSlice";
import { setModal } from "lib/client/store/modalSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function ProductItem({ product, selectedProductIds, setSelectedProductIds }: any) {
  const { _id, images, title, price, inStock, description } = product;
  const { auth, cart }: any = useSelector((store) => store);
  const checkRef: any = useRef();
  const dispatch = useDispatch();
  const userLink = (
    <>
      <Link href={`/commerce/product/${_id}`}>View</Link>
      <button
        disabled={inStock ? false : true}
        onClick={() => {
          const duplicate = cart.find((v: any) => v._id === product._id);
          // console.log("duplicate:", duplicate);
          if (duplicate) {
            return dispatch(
              setNotify({
                status: "error",
                message: `duplicated id : ${duplicate._id}`,
                visible: true,
              })
            );
          } else {
            return dispatch(addToCart({ ...product, quantity: 1 }));
          }
          // console.log("product:", product);
          // console.log("cart:", cart);
          // cart.map((v: any) => console.log(v));
          // if (!cart.length) dispatch(addToCart(product));
          // else {
          //   const duplicate = cart.filter((v: any) => v._id === product._id);
          //   if (duplicate) return;
          //   else dispatch(addToCart(product));
          // }
          // dispatch(addToCart(product));
          // console.log("product._id : ", product._id);
          // console.log("cart : ", cart);
          // if (!cart.length) return dispatch(addToCart(product));
          // const test = cart.every((v: any) => v._id !== product._id);
          // const result = cart.filter((v: any) => v._id === product._id);
          // if (result) console.log(result);
          // cart.map((v: any) => {
          //   if (v._id === product._id) {
          //     return dispatch(setNotify());
          //   } else {
          //     console.log("asdkhadsi");
          //     return dispatch(addToCart(product));
          //   }
          // });
          // cart.find((v: any) => console.log("v:", v));
          // console.log(test);
        }}
      >
        Buy
      </button>
    </>
  );
  const adminLink = (
    <>
      <Link href={`/commerce/product/create/${_id}`}>Edit</Link>
      <button
        className="delete-button"
        onClick={() => {
          dispatch(
            setModal({
              active: true,
              type: "DELETE_PRODUCT",
              message: "Do you want to delete",
              id: _id,
            })
          );
        }}
      >
        Delete
      </button>
    </>
  );

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      setSelectedProductIds((state: any) => [...state, _id]);
    } else {
      setSelectedProductIds((state: any) => {
        const filteredProductIds = state.filter(
          (selectedProductId: any) => selectedProductId !== _id
        );
        return filteredProductIds;
      });
    }
  };

  useEffect(() => {
    if (!selectedProductIds.length && checkRef.current) checkRef.current.checked = false;
    selectedProductIds.map((selectedProductId: any) => {
      if (selectedProductId === _id) checkRef.current.checked = true;
    });

    // const result = selectedProductIds.filter((selectedProductId: any) => {
    //   if (selectedProductId === _id) {
    //     checkRef.current.checked = true;
    //     return true;
    //   }
    // });
  }, [selectedProductIds]);

  return (
    <Item>
      <div className="image">
        {auth.user?.role === "admin" && (
          <input ref={checkRef} className="check" type="checkbox" onChange={handleCheck} />
        )}
        <Image
          src={images[0].url || images[0].secure_url}
          alt={images[0].url}
          width={200}
          height={200}
        />
      </div>
      <div className="description">
        <h5>{title}</h5>
        <div className="price">
          <h6>${price}</h6>
          {inStock > 0 ? <h6>In Stock : {inStock}</h6> : <h6>Out Stock</h6>}
        </div>
        <p>{description}</p>
        <div className="action-tags">
          {auth.user?.role === "admin" && adminLink}
          {auth.user?.role === "user" && userLink}
        </div>
      </div>
    </Item>
  );
}
const Item = styled.li`
  /* width: 10rem; */
  border: 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .image {
    height: 7rem;
    position: relative;
    .check {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    > img {
      object-position: 0 20%;
      /* object-position: top; */
    }
  }
  > .description {
    padding: 1rem;
    .price {
      color: #d25d5d;
    }
  }
  > div {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > .action-tags {
      height: 3rem;
      > a {
        background-color: lightgray;
        color: black;
        width: initial;
        display: flex;
        align-items: center;
        padding: 1rem;
        :hover {
          background-color: #000;
          color: #fff;
        }
      }
      > button {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        padding: 1rem;
      }
      .delete-button {
        background-color: #c15151;
      }
    }
  }
`;
