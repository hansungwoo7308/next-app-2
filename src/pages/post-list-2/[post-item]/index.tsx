export function getServerSideProps(context: any) {
  // const postItem = context.params["post-item"];
  const { "post-item": postItem } = context.params;
  // console.log("postItem : ", postItem);
  // console.log("context.params : ", context.params);
  return {
    props: {
      postItem,
    },
  };
}
export default function index({ postItem }: any) {
  return (
    <main>
      <section>
        <div>
          <h1>post item : {postItem}</h1>
        </div>
      </section>
    </main>
  );
}
