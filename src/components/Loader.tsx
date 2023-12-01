import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const parent = {
  initial: {
    width: "300px",
    height: "300px",
  },
  animate: {
    // width: "initial",
    // width: "100%",
    // width: "300px",
    // height: "300px",
    // transition: {
    //   duration:3
    //   // 페런트 변수에 칠드런의 지연과 시차를 설정한다
    //   // 칠드런의 각각의 애니메이션이 실행되는 시간을 다르게 설정하기 위해서 패런트에서 설정해준다
    //   // delayChildren: 0.4,
    //   // staggerChildren: 0.5,
    //   // ease: [0.6, 0.01, -0.05, 0.95],
    // },
  },
};
const children: Variants = {
  // initial: { y: 400 },
  animate: {
    // y: 0,
    // opacity: 1,
    // width: "100%",
    transition: {
      duration: 1,
      ease: "easeInOut",
      // ease: [0.6, 0.01, -0.05, 0.95],
      // ease: "[0.6, 0.01, -0.05, 0.95]",
    },
  },
};
const variants: any = {
  // initial: { originX: "0px", originY: "0px" },
};

export default function Loader() {
  return (
    <Box>
      <motion.div className="something-outer" variants={variants} initial="initial" layoutId="123">
        <Link href={"/works"}>
          <motion.img
            className="something"
            src="/images/test_0.jpeg"
            alt="alt"
            whileHover={{ scale: 1.1 }}
            // transition={{ duration: 20, ease: [0.6, 0.01, -0.05, 0.9] }}
          />
        </Link>
      </motion.div>
    </Box>
  );
}

const Box = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .something-outer {
    border: 2px solid coral;
    width: 300px;
    height: 300px;
    overflow: hidden;
    /* .something {
      height: 100%;
    } */
  }
`;
