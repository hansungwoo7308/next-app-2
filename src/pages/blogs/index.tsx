import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "types/interfaces/Blog";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export function getStaticProps(context: any) {
  console.log("\x1b[32m\n[/blogs]");
  const filenames: Array<string> = fs
    .readdirSync("data/blogs")
    .filter((filename) => filename.endsWith(".md"));
  // console.log("filenames : ", filenames);
  const list: Array<Blog> = filenames.map((filename) => {
    const contents = fs.readFileSync(`data/blogs/${filename}`, "utf-8");
    const matterResult = matter(contents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      filename: filename.replace(".md", ""),
    };
  });
  console.log("list : ", list);
  return { props: { list } };
}
export default function Page({ list }: any) {
  const blogRef: any = useRef();
  useEffect(() => {
    blogRef.current.focus();
  }, []);
  useEffect(() => {
    // console.log("list : ", list);
    const event: any = function (e: any) {
      if (e.key === "ArrowDown") {
        // console.log("e : ", e);
        if (blogRef.current === blogRef.current.parentElement.lastChild) {
          blogRef.current = blogRef.current.parentElement.firstChild;
          blogRef.current.focus();
        } else {
          blogRef.current = blogRef.current.nextSibling;
          blogRef.current.focus();
        }
      }
      if (e.key === "ArrowUp") {
        // console.log("e : ", e);
        if (blogRef.current === blogRef.current.parentElement.firstChild) {
          blogRef.current = blogRef.current.parentElement.lastChild;
          blogRef.current.focus();
        } else {
          blogRef.current = blogRef.current.previousSibling;
          blogRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", event);
    return () => {
      document.removeEventListener("keydown", event);
    };
  });
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Main>
        <section>
          <div>
            <h1>blogs (static : Markdown)</h1>
            <ul>
              {list.map((item: any, index: number) => (
                <Link
                  href={`/blogs/${item.filename}`}
                  key={index}
                  ref={index === 0 ? blogRef : null}
                >
                  <h5>{item.date}</h5>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </ul>
            <div>
              <Link href={"/blogs/create"}>
                <button>Create a new blog</button>
              </Link>
            </div>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 70%;
      max-width: 800px;
      height: 50vh;
      min-height: 800px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      outline: 3px solid green;
      > ul {
        display: flex;
        flex-direction: column;
        gap: 15px;
        a {
          outline: 3px solid gray;
          padding: 10px;
          :focus,
          :hover {
            outline: 3px solid coral;
            /* box-shadow: none; */
          }
        }
      }
      > button {
        width: 100%;
      }
    }
  }
`;
