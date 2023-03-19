import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
// import { PostMetaData } from "types/postMetaData";
import { PostMetaData } from "../../../types/PostMetaData";

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

export const getStaticProps = (context: any) => {
  // get the files
  const files = fs.readdirSync("data/");
  // get the files with markdown
  const filesWithMarkDown = files.filter((file) => file.endsWith(".md"));
  // get items with the contents from third party library
  const itemsWithContents: PostMetaData[] = filesWithMarkDown.map(
    (fileName) => {
      const contents = fs.readFileSync(`data/${fileName}`, "utf-8");
      const matterResult = matter(contents);
      // return an item
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        subtitle: matterResult.data.subtitle,
        slug: fileName.replace(".md", ""),
      };
    }
  ) as [];

  //   console.log("\x1b[32mcontext in getStaticProps : %s\x1b[0m", context);
  //   console.log("\x1b[32mcontext : %s\x1b[0m", context);
  //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
  //   console.log("\x1b[32mfilesWithMarkDown : %s\x1b[0m", filesWithMarkDown);
  //   console.log("\x1b[32mposts : %s\x1b[0m", posts);
  // console.log("");
  // itemsWithContents.map((item) =>
  //   console.log("\x1b[32mitem : %s\x1b[0m", item)
  // );
  // console.log("files : ", files);
  // console.log("");
  return {
    props: {
      itemsWithContents,
    },
  };
};

const Posts = ({ itemsWithContents }: any) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className="posts">
        <section>
          <div>
            {itemsWithContents.map((item: any, index: any) => (
              <Link key={index} href={`/posts/${item.slug}`}>
                <h3>{item.date}</h3>
                <h1>{item.title}</h1>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Posts;
