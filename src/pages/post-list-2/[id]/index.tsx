import { Main } from "@/styles/public/main.styled";
import { GetServerSidePropsContext } from "next";
type Props = {
  params: {
    "post-item": string;
  };
};
export function getServerSideProps(context: GetServerSidePropsContext) {
  // const { "post-item": filename }: any = context.params;
  const { id }: any = context.params;
  // console.log("id : ", id);
  return { props: { id } };
}
export default function Page({ id }: any) {
  return (
    <Main>
      <section>
        <div>
          <div>
            {/* <h5>{postItem.date}</h5> */}
            <h1>Post Item : {id}</h1>
          </div>
          {/* <Markdown>{postItem.content}</Markdown> */}
        </div>
      </section>
    </Main>
  );
}
