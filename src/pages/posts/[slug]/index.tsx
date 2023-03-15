import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

export const getStaticPaths = (context: any) => {
  const files = fs.readdirSync("data/");
  const markDownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markDownPosts.map((file) => file.replace(".md", ""));
  // const slugsWithFullPath = slugs.map((slug) => "/posts/" + slug);
  const slugsWithParams = slugs.map((some) => ({
    params: {
      slug: some,
    },
  }));
  console.log("");
  //   console.log("\x1b[32mfiles : %s\x1b[0m", files);
  //   console.log("\x1b[32mmarkDownPosts : %s\x1b[0m", markDownPosts);
  //   console.log("\x1b[32mslugs : %s\x1b[0m", slugs);
  // console.log("\x1b[32mslugsWithDir : %s\x1b[0m", slugsWithFullPath);
  slugsWithParams.map((item) =>
    console.log("\x1b[32mitem.params : %s\x1b[0m", item.params)
  );
  // console.log("\x1b[32mslugsWithParams : %s\x1b[0m", slugsWithParams);
  console.log("");

  return {
    // paths: [{ params: { slug: "data1" } }],
    paths: slugsWithParams,
    // paths: [
    //   "/posts/data1",
    //   "/posts/data2",
    //   "/posts/data3",
    //   "/posts/data4",
    //   "/posts/data5",
    // ],
    fallback: false,
  };
};

export const getStaticProps = (context: any) => {
  const content = fs.readFileSync(`data/${context.params.slug}.md`, "utf8");
  const matterResult = matter(content);
  console.log("");
  //   console.log("\x1b[32mcontext in getStaticProps : %s\x1b[0m", context);
  console.log("\x1b[32mcontext.params.slug : %s\x1b[0m", context.params.slug);
  // console.log("\x1b[32mmatterResult : %s\x1b[0m", matterResult.content);
  console.log("");
  return {
    props: {
      content: matterResult.content,
      title: matterResult.data.title,
      date: matterResult.data.date,
    },
  };
};

const Slug = ({ content, title, date }: any) => {
  //   console.log("");
  //   console.log("\x1b[32mslug : %s\x1b[0m", slug);
  //   console.log("");

  return (
    <div>
      <main className="blog">
        <section>
          <div>
            <p>{date}</p>
            <h1>{title}</h1>
            <Markdown>{content}</Markdown>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Slug;
