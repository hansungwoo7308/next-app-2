import { decreaseQuantity, deleteItem, increaseQuantity } from "lib/client/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
export default function CartItem({ item }: any) {
  const { _id, images, title, quantity, inStock, price } = item;
  const dispatch = useDispatch();
  return (
    <Box>
      <div className="image">
        <Link href={`/commerce/product/${_id}`}>
          <Image src={images[0].url} alt={images[0].url} width={1000} height={1000} />
        </Link>
      </div>
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
          <button onClick={() => dispatch(deleteItem({ _id }))}>Delete</button>
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
  .image {
    height: 100%;
    padding: 0;
    display: flex;
  }
  .detail {
    padding: 1rem;
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
