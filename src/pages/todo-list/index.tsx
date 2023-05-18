import TodoList from "@/components/TodoList";
import { Main } from "@/styles/public/main.styled";
export default function Page() {
  return (
    <Main>
      <section>
        <TodoList />
      </section>
    </Main>
  );
}
