import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
export default function Page() {
  return (
    <Main>
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
    </Main>
  );
}
function Section() {
  const targetRef = useRef(null);
  // offset : scroll의 기준점을 잡는 추가 옵션
  // useTransform이 리턴하는 값이 scroll이 변함에 따라서, 0에서부터 기준을 잡게된다.
  // offset을 옵션으로 추가하면,
  // viewport top에서 targetRef bottom이 간격이 0이 되는 순간이 바로, [0,1]에서 0을 나타낸다
  // const { scrollYProgress } = useScroll({ target: targetRef, offset: ["end end", "start start"] });
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["end end", "end start"] });
  // const { scrollYProgress } = useScroll({});
  const width: any = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  console.log({ width });
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     console.log("scroll");
  //   });
  // }, []);
  return (
    <section ref={targetRef}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, rem quam impedit
        similique sint recusandae quaerat qui quod provident molestias, consequatur velit culpa vel
        labore praesentium doloremque natus. Excepturi, unde.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, rem quam impedit
        similique sint recusandae quaerat qui quod provident molestias, consequatur velit culpa vel
        labore praesentium doloremque natus. Excepturi, unde.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, rem quam impedit
        similique sint recusandae quaerat qui quod provident molestias, consequatur velit culpa vel
        labore praesentium doloremque natus. Excepturi, unde.
      </p>
      <motion.div className="progress-bar" style={{ width }}></motion.div>
    </section>
  );
}
const Main = styled.main`
  > section {
    min-height: 50vh;
    padding: 10rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px dashed;
    .progress-bar {
      height: 3rem;
      background-color: lightblue;
      border: 2px solid green;
      place-self: start;
    }
  }
`;
