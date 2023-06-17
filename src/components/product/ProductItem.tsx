import { selectAcessToken } from "lib/client/store/authSlice";
import { addToCart, selectCart } from "lib/client/store/cartSlice";
import { setMessage } from "lib/client/store/notifySlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
export default function ProductItem({ product }: any) {
  const { _id, images, title, price, inStock, description } = product;
  const auth = useSelector(selectAcessToken) || useSession().data;
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const userLink = (
    <>
      <Link href={`/commerce/product/${_id}`}>View</Link>
      <button
        disabled={inStock ? false : true}
        onClick={() => {
          const duplicate = cart.find((v: any) => v._id === product._id);
          console.log("duplicate:", duplicate);
          if (duplicate) return dispatch(setMessage({ message: `duplicate ${duplicate._id}` }));
          else return dispatch(addToCart(product));
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
          //     return dispatch(setMessage({ message: "duplicate" }));
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
    <Item key={_id}>
      <div className="image">
        <Image src={images[0].url} alt={images[0].url} width={200} height={200} />
      </div>
      <div>
        <h5>{title}</h5>
        <div className="price">
          <h6>${price}</h6>
          {inStock > 0 ? <h6>In Stock : {inStock}</h6> : <h6>Out Stock</h6>}
        </div>
        <p>{description}</p>
        <div className="action-tags">
          {auth && adminLink}
          {!auth && userLink}
        </div>
      </div>
    </Item>
  );
}
const Item = styled.li`
  /* width: 10rem; */
  border: 2px solid;
  /* padding: 1rem; */
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
