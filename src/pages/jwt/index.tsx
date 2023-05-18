import JWT from "@/components/JWT";
import { Main } from "@/styles/public/main.styled";
export default function Page() {
  return (
    <Main>
      <section>
        <JWT style={{ width: "500px", height: "500px", color: "lightgreen" }} />
      </section>
    </Main>
  );
}
