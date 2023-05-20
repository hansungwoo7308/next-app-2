import { Main } from "@/styles/public/main.styled";
import PostListByRTKquery from "@/components/post/list/PostListByRTKquery";
let renderCount = 0;
export default function Page() {
  renderCount++;
  return (
    <>
      <Main>
        <section>
          <h1>renderCount : {renderCount}</h1>
          <PostListByRTKquery />
        </section>
      </Main>
    </>
  );
}
