import styled from "styled-components";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { getData } from "lib/client/utils/fetchData";
import Image from "next/image";
import { useState } from "react";
export async function getServerSideProps({ params: { id } }: any) {
  //   console.log("id : ", id);
  const response = await getData(`product/${id}`);
  const {
    data: { product },
  } = response;
  return { props: { product } };
}
export default function Page({ product }: any) {
  //   console.log(product);
  const { images } = product;
  const [tabIndex, setTabIndex]: any = useState(0);
  //   console.log("images : ", images);
  const handleClick = (index: any) => {
    // tabIndex으로부터 변경될 사항
    setTabIndex(index);
    // event로부터 변경될 사항
    //   const image = e.target;
    //   const images = image.parentNode.childNodes;
    //   const imagesArray = Array.from(images);
    //   imagesArray.map((image: any) => (image.style.border = ""));
    //   image.style.border = "2px solid blue";
  };
  return (
    <Main>
      <section>
        <div>
          <h1>Product Page</h1>
          <div className="thumbnail">
            <Image
              src={images[tabIndex].url}
              alt={images[tabIndex].url}
              width={1000}
              height={1000}
            />
          </div>
          <div className="detail">
            {images.map((image: any, index: any) => (
              <Image
                className={`${tabIndex === index && "active"}`}
                key={index}
                src={image.url}
                alt={image.url}
                width={500}
                height={500}
                onClick={() => setTabIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    display: flex;
    align-items: flex-start;
    > div {
      img {
        cursor: pointer;
      }
      .active {
        outline: 2px solid coral;
      }
      .thumbnail {
        width: 50%;
        @media (width<500px) {
          width: 100%;
        }
      }
      .detail {
        width: 15%;
        display: flex;
        gap: 5%;
        img {
          /* width: 10rem; */
          height: 7rem;
        }
      }
    }
  }
`;
