import { Main } from "@/styles/public/main.styled";
import { useSelector } from "react-redux";

export default function Page() {
  const { orders }: any = useSelector((store) => store);
  return (
    <Main>
      <section>
        <div>
          <h1>sdkfhsdflhsfl</h1>
        </div>
      </section>
    </Main>
  );
}
