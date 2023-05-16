import { Main } from "@/styles/pages/post-list.styled";
import PostListByRTKquery from "@/components/post/list/PostListByRTKquery";
let renderCount = 0;
export default function PostList() {
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
