import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
export default function Page() {
  return (
    <>
      <Main>
        <section>
          <div>
            <form>
              <input type="text" placeholder="Title" />
              <textarea
                name="content"
                id="content"
                cols={30}
                rows={10}
                placeholder="Content"
                required
              />
              <button>Regist</button>
            </form>
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
      max-width: 700px;
      height: 50vh;
      > form {
        /* outline: 2px solid; */
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
    }
  }
`;
