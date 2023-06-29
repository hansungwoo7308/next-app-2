import { selectAuth } from "lib/client/store/authSlice";
import { addToCart, selectCart } from "lib/client/store/cartSlice";
import { setTimeoutId, setNotify, setVisible } from "lib/client/store/notifySlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function ProductItem({ product }: any) {
  const { _id, images, title, price, inStock, description } = product;
  const auth = useSelector(selectAuth);
  const cart = useSelector(selectCart);
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
              setNotify({ message: `duplicated id : ${duplicate._id}`, visible: true })
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
      <Link href={`/commerce/product/${_id}`}>Edit</Link>
      <button>Delete</button>
    </>
  );
  return (
    <Item>
      <div className="image">
        <Image src={images[0].url} alt={images[0].url} width={200} height={200} />
      </div>
      <div className="description">
        <h5>{title}</h5>
        <div className="price">
          <h6>${price}</h6>
          {inStock > 0 ? <h6>In Stock : {inStock}</h6> : <h6>Out Stock</h6>}
        </div>
        <p>{description}</p>
        <div className="action-tags">
          {userLink}
          {/* {auth && adminLink} */}
          {/* {!auth && userLink} */}
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
    }
  }
`;
