import { selectAcessToken } from "lib/client/store/authSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
export default function ProductItem({ product }: any) {
  const { _id, images, title, price, inStock, description } = product;
  const auth = useSelector(selectAcessToken) || useSession().data;
  const userLink = (
    <>
      <button>
        <Link href={`commerce/product/${_id}`}>View</Link>
      </button>
      <button>Buy</button>
    </>
  );
  const adminLink = (
    <>
      <button>
        <Link href={`commerce/product/${_id}`}>Edit</Link>
      </button>
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
        <div>
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
      object-fit: cover;
      object-position: top;
    }
  }
  > div {
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;
