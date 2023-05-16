// modules
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import getWikiResults from "lib/utils/getWiki";
import { Main } from "@/styles/search.styled";
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
export default function index({ query, items }: any) {
  // console.log("items : ", items);
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
                      className="text-xl font-bold underline"
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
                      className="text-xl font-bold underline"
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
