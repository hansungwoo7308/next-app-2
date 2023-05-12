import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "types/interfaces/Blog";
import { useEffect, useRef } from "react";
export const getStaticProps = (context: any) => {
  // get the filenames
  const filenames = fs
    .readdirSync("data/blogs")
    .filter((filename) => filename.endsWith(".md"));
  const items: Blog[] = filenames.map((filename, index) => {
    const contents = fs.readFileSync(`data/blogs/${filename}`, "utf-8");
    const matterResult = matter(contents);
    // console.log("filename : ", filename);
    return {
      index: index,
      blog: filename.replace(".md", ""),
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });
  // console.log("");
  // console.log("\x1b[32mitems : %s\x1b[0m", items);
  // console.log("\x1b[32mgetStaticProps running well...\x1b[0m");
  // console.log("");
  return {
    props: {
      items,
    },
  };
};
export default function Blogs({ items }: any) {
  const blogRef: any = useRef();
  useEffect(() => {
    blogRef.current.focus();
    // blogRef.current.addEventListener("keydown", (e:any) => {
    //   console.log("e : ", e);
    //   if (e.key === "ArrowDown") {
    //     blogRef.current.nextSibling.focus();
    //     console.log(
    //       "blogRef.current.nextSibling : ",
    //       blogRef.current.nextSibling
    //     );
    //   }
    // });
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
      <main className="blogs">
        <section>
          <div>
            {items.map((item: any) => (
              <Link
                key={item.index}
                href={`/blogs/${item.blog}`}
                ref={item.index === 0 ? blogRef : null}
              >
                <h3>{item.date}</h3>
                <h1>{item.title}</h1>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
