import { decreaseQuantity, increaseQuantity } from "lib/client/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
export default function CartItem({ item }: any) {
  const { _id, images, title, quantity, inStock, price } = item;
  //   console.log("item : ", item);
  const dispatch = useDispatch();
  //   console.log("quantity : ", item.quantity);
  return (
    <Box>
      <Link href={`/commerce/product/${_id}`}>
        <Image src={images[0].url} alt={images[0].url} width={1000} height={1000} />
      </Link>
      <div className="detail">
        <Link href={`/commerce/product/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <h3>in stock : {inStock}</h3>
        <div className="quantity">
          <h5>quantity : {quantity}</h5>
          <div>
            <button onClick={() => dispatch(decreaseQuantity({ _id }))} disabled={quantity === 1}>
              -
            </button>
            <button
              onClick={() => dispatch(increaseQuantity({ _id }))}
              disabled={quantity === inStock}
            >
              +
            </button>
          </div>
          <button>Delete</button>
        </div>
        <div className="price">
          <h5>price : ${price * quantity}</h5>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.li`
  height: 10rem;
  display: flex;
  border: 2px solid;
  > a {
    width: 10rem;
    /* height: 10rem; */
  }
  > div {
    padding: 1rem;
  }
  > .detail {
    flex: 1;
    .quantity {
      display: flex;
      gap: 2rem;
      justify-content: flex-end;
      align-items: center;
    }
    .price {
      height: 2rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
`;
