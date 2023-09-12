import styled from "styled-components";
import { Variants, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const imageVariants: any = {
  animate: { width: "100%" },
};
const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
const messageParentVariants: Variants = {
  animate: {
    transition: {
      duration: 1,
      delayChildren: 1,
      staggerChildren: 0.1,
    },
  },
};
const messageChildrenVariants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};
export default function Tester() {
  return (
    <Box>
      {/* image animation */}
      <motion.div
        className="something-outer"
        variants={imageVariants}
        animate="animate"
        transition={transition}
        layoutId="123"
      >
        <Link href={"/test"}>
          <motion.img initial={{ scale: 1.1 }} src="/images/test_0.jpeg" alt="alt" />
        </Link>
      </motion.div>
      {/* message animation */}
      <motion.div
        className="message"
        variants={messageParentVariants}
        // endpoint의 애니메이션의 설정을 패런트에서 해준다.
        initial="initial"
        animate="animate"
      >
        {"something...".split("").map((v: any) => (
          <motion.span variants={messageChildrenVariants}>{v}</motion.span>
        ))}
      </motion.div>
      {/* <motion.div className="test-image" whileHover={{ scale: 1.1 }}>
          <Image src={"/images/test_0.jpeg"} alt="alt" width={1000} height={600}></Image>
        </motion.div> */}
    </Box>
  );
}
const Box = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid coral;
  display: flex;
  justify-content: center;
  align-items: end;
  .something-outer {
    width: 300px;
    height: 300px;
    border: 2px solid coral;
    overflow: hidden;
  }
  .message {
    position: absolute;
    place-self: center;
    font-size: 70px;
    span {
      display: inline-block;
    }
  }
`;
