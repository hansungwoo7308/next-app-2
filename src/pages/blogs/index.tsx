import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "types/interfaces/Blog";
import { Main } from "@/styles/public/main.styled";
export function getStaticProps(context: any) {
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
  console.log("");
  console.log("list : ", list);
  console.log("");
  return { props: { list } };
}
export default function Page({ list }: any) {
  const blogRef: any = useRef();
  useEffect(() => {
    blogRef.current.focus();
    // console.log("blogRef.current : ", blogRef.current);
  }, []);
  useEffect(() => {
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
            <ul>
              {list.map((item: any, index: number) => (
                <Link
                  href={`/blogs/${item.filename}`}
                  key={index}
                  ref={index === 0 ? blogRef : null}
                >
                  <h3>{item.date}</h3>
                  <h1>{item.title}</h1>
                </Link>
              ))}
            </ul>
            <Link href={"/blogs/create"}>
              <button>Create a new blog</button>
            </Link>
          </div>
        </section>
      </Main>
    </>
  );
}
