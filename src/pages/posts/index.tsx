import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
// import Link from "next/link";
// import fs from "fs";
// import matter from "gray-matter";
// // import { PostMetaData } from "types/postMetaData";
// import { PostMetaData } from "../../../types/PostMetaData";

// export const getStaticPaths = (context: any) => {
//   // const slugs = markDownPosts.map((file) => file.replace(".md", ""));
//   // const slugsWithFullPath = slugs.map((slug) => "/posts/" + slug);
//   // const slugsWithParams = slugs.map((slug) => ({
//   //   params: {
//   //     slug: slug,
//   //   },
//   // }));
//   console.log("");
//   //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
//   //   console.log("\x1b[32mmarkDownPosts : %s\x1b[0m", markDownPosts);
//   //   console.log("\x1b[32mslugs : %s\x1b[0m", slugs);
//   // console.log("\x1b[32mslugsWithDir : %s\x1b[0m", slugsWithFullPath);
//   // console.log("\x1b[32mslugsWithParams : %s\x1b[0m", slugsWithParams);
//   console.log("");

//   return {
//     // paths: [{ params: { slug: "data1" } }],
//     //   paths: slugsWithParams,
//     paths: [
//       "/posts",
//       //   "/posts/data2",
//       //   "/posts/data3",
//       //   "/posts/data4",
//       //   "/posts/data5",
//     ],
//     fallback: false,
//   };
// };

// export const getStaticProps = (context: any) => {
//   // get the files
//   const files = fs.readdirSync("data/");
//   // get the files with markdown
//   const filesWithMarkDown = files.filter((file) => file.endsWith(".md"));
//   // get items with the contents from third party library
//   const itemsWithContents: PostMetaData[] = filesWithMarkDown.map(
//     (fileName) => {
//       const contents = fs.readFileSync(`data/${fileName}`, "utf-8");
//       const matterResult = matter(contents);
//       // return an item
//       return {
//         title: matterResult.data.title,
//         date: matterResult.data.date,
//         subtitle: matterResult.data.subtitle,
//         slug: fileName.replace(".md", ""),
//       };
//     }
//   ) as [];

//   //   console.log("\x1b[32mcontext in getStaticProps : %s\x1b[0m", context);
//   //   console.log("\x1b[32mcontext : %s\x1b[0m", context);
//   //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
//   //   console.log("\x1b[32mfilesWithMarkDown : %s\x1b[0m", filesWithMarkDown);
//   //   console.log("\x1b[32mposts : %s\x1b[0m", posts);
//   // console.log("");
//   // itemsWithContents.map((item) =>
//   //   console.log("\x1b[32mitem : %s\x1b[0m", item)
//   // );
//   // console.log("files : ", files);
//   // console.log("");
//   return {
//     props: {
//       itemsWithContents,
//     },
//   };
// };

const Posts = ({ itemsWithContents }: any) => {
  const modalRef: any = useRef();
  const modalBackgroundRef: any = useRef();
  const [posts, setPosts]: any = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const data = await response.data;
      console.log("data : ", data);
      setPosts(data);
    } catch (error) {
      console.log("getPosts error : ", error);
    }
  };

  const createPost = async ({ title, content }: any) => {
    console.log("createPost");
    console.log("title : ", title);
    console.log("content : ", content);
    try {
      const response = await axios.post("/api/posts", {
        title,
        content,
      });
      console.log("response : ", response);
      // const data = await response.data;
      // console.log("data : ", data);
      // setPost(data);
    } catch (error) {
      console.log("createPost error : ", error);
    }
  };

  const openModal = () => {
    modalBackgroundRef.current.style.display = "block";
    modalBackgroundRef.current.style.background = "rgba(0,0,0,0.5)";
    modalRef.current.style.display = "block";
  };

  const closeModal = () => {
    modalBackgroundRef.current.style.display = "none";
    modalRef.current.style.display = "none";
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className="posts">
        <section>
          <div>
            <h1>posts</h1>
            <ul>
              {posts
                .map((post: any, index: any) => (
                  <li key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </li>
                ))
                .slice(0, 4)}
            </ul>
            <div>
              <button onClick={getPosts}>Get data</button>
              <button onClick={openModal}>Create a post</button>
            </div>
          </div>
          <div ref={modalBackgroundRef} onClick={closeModal} />
          <Modal
            modalRef={modalRef}
            createPost={createPost}
            closeModal={closeModal}
            getPosts={getPosts}
          />
        </section>
        {/* {itemsWithContents.map((item: any, index: any) => (
              <Link key={index} href={`/posts/${item.slug}`}>
                <h3>{item.date}</h3>
                <h1>{item.title}</h1>
              </Link>
            ))} */}
      </main>
    </>
  );
};

export default Posts;
