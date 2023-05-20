import { Main } from "@/styles/public/main.styled";
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
