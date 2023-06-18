import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
export default function CartItem({ item }: any) {
  const { _id, images, title, quantity } = item;
  console.log("quantity : ", item.quantity);
  return (
    <Box>
      <Link href={`/commerce/product/${_id}`}>
        <Image src={images[0].url} alt={images[0].url} width={1000} height={1000} />
      </Link>
      <div className="detail">
        <Link href={`/commerce/product/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <div className="quantity">
          <h5>quantity : {quantity}</h5>
          <div>
            <button>+</button>
            <button>-</button>
          </div>
        </div>
      </div>
    </Box>
  );
}
const Box = styled.li`
  height: 7rem;
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
  }
  .quantity {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
    align-items: center;
  }
`;
