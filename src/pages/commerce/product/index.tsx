import { getData } from "lib/client/utils/fetchData";
import { searchWithFilter } from "lib/client/utils/searchWithFilter";
import Filter from "@/components/Filter";
import ProductItem from "@/components/product/ProductItem";
import { Main as PublicMain } from "@/styles/public/main.styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setModal } from "lib/client/store/modalSlice";
export async function getServerSideProps({ query }: any) {
  const response = await getData("product", undefined, query);
  const { products } = response.data;
  return { props: { data: products } };
}
export default function Page({ data }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  const [products, setProducts]: any = useState([]);
  const [checkedProducts, setCheckedProducts]: any = useState([]);
  const [isCheckAll, setIsCheckAll]: any = useState(false);
  const [page, setPage]: any = useState(1);
  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);
  useEffect(() => {
    console.log({ data });
    setProducts(data);
  }, [data]); // data waterfall
  // useEffect(() => {
  //   if (notify.status === "success") router.push({ query: null });
  // }, [notify.status]);
  const handleCheckAll = () => {
    if (!isCheckAll) {
      const productIds = products.map((product: any) => product._id);
      setCheckedProducts(productIds);
      setIsCheckAll(true);
    }
    if (isCheckAll) {
      setCheckedProducts([]);
      setIsCheckAll(false);
    }
    // setIsCheckAll((state: boolean) => !state);
  };
  const handleClickDeleteSelectedProducts = () => {
    dispatch(
      setModal({
        active: true,
        type: "DELETE_PRODUCTS",
        message: "Do you want to delete this selected products?",
        ids: checkedProducts,
      })
    );
    setCheckedProducts([]);
  };
  // useEffect(() => {
  //   console.log({ checkedProducts });
  // }, [checkedProducts]);
  return (
    <Main>
      <section>
        <div className="products">
          <Filter />
          {auth.user?.role === "admin" && (
            <div>
              <button onClick={handleCheckAll}>{isCheckAll ? "Unselect All" : "Select All"}</button>
              <button onClick={handleClickDeleteSelectedProducts}>Delete</button>
            </div>
          )}
          <ul>
            {products?.map((product: any) => (
              <ProductItem
                key={product._id}
                product={product}
                setCheckedProducts={setCheckedProducts}
                isCheckAll={isCheckAll}
              />
            ))}
          </ul>
          <div className="load-more">
            <button
              onClick={() => {
                setPage(page + 1);
                // setFilter({ ...filter, productPage: filter.productPage + 1 });
                // console.log("filter : ", filter);
                // setFilter((state: any) => ({
                //   ...state,
                //   productPage: state.productPage + 1,
                // }));
                router.query.page = page + 1;
                router.push({ pathname: router.pathname, query: router.query });
              }}
            >
              Load More
            </button>
          </div>
        </div>

        {!products && (
          <div>
            <h1>Product Page</h1>
            <p>No products</p>
          </div>
        )}
      </section>
    </Main>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      /* height: 90vh; */
      > ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-auto-rows: minmax(20rem, auto);
        /* grid-template-rows: repeat(2, minmax(20rem, 1fr)); */
        gap: 1rem;
      }
      .load-more {
        /* border: 2px solid; */
        text-align: center;
        padding: 3rem;
        button {
          padding: 1.5rem;
        }
      }
    }
  }
`;
