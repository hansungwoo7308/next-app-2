import Search from "@/components/Search";
import { Main } from "@/styles/pages/search.styled";
export default function Page() {
  return (
    <>
      <Main>
        <section>
          <div>
            <h1>Search Page</h1>
            <Search />
          </div>
        </section>
      </Main>
    </>
  );
}
