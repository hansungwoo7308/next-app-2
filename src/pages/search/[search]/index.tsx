import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import getWikiResults from "lib/utils/getWiki";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
const Main = styled(PublicMain)`
  // Override
  > section {
    > div {
      width: 100%;
      > ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 20px;
        > li {
          display: flex;
          gap: 10px;
          padding: 10px;
          outline: 2px solid;
        }
      }
    }
  }
`;
export async function getServerSideProps(context: any) {
  const wikiResults: SearchResult = await getWikiResults(context.params.search);
  const pages: any = wikiResults?.query?.pages;
  const items = pages ? Object.values(pages) : null;
  // console.log("wikiResults : ", wikiResults);
  // console.log("pages : ", pages);
  // console.log("items : ", items);
  // console.log("pages values : ", Object.values(pages));
  return {
    props: {
      query: context.params.search,
      items: items,
    },
  };
}
export default function Page({ query, items }: any) {
  console.log("items : ", items);
  if (!items)
    return (
      <>
        <Head>
          <title>Search Results</title>
        </Head>
        <Main>
          <section>
            <div>
              <h1>{query} is not found.</h1>
            </div>
          </section>
        </Main>
      </>
    );
  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <Main>
        <section>
          <div>
            <ul>
              {items.map((item: any) =>
                item?.thumbnail?.source ? (
                  <li key={item.pageid}>
                    <Link
                      href={`https://en.wikipedia.org/?curid=${item.pageid}`}
                      target="_blank"
                    >
                      <Image
                        src={item.thumbnail.source}
                        alt={item.title}
                        width={item.thumbnail.width}
                        height={item.thumbnail.height}
                        loading={"lazy"}
                      />
                    </Link>
                    <p>{item.extract}</p>
                  </li>
                ) : (
                  <li key={item.pageid}>
                    <Link
                      href={`https://en.wikipedia.org/?curid=${item.pageid}`}
                      target="_blank"
                    >
                      <h3>{item.title}</h3>
                    </Link>
                    <p>{item.extract}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      </Main>
    </>
  );
}
