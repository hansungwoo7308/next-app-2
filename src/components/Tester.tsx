import styled from "styled-components";
import { Transition, Variants, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// const imageVariants: Variants = { animate: { width: "100%" } };
// const imageTransition: Transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
// const messageParentVariants: Variants = {
//   animate: {
//     transition: {
//       duration: 1,
//       delayChildren: 1,
//       staggerChildren: 0.1,
//     },
//   },
// };
// const messageChildrenVariants: Variants = {
//   initial: { y: 300, opacity: 0 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     // transition: { duration: 1 },
//     // transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] },
//     transition: { duration: 1, ease: "easeOut" },
//   },
// };
export default function Tester() {
  return (
    <Box>
      {/* image animation */}
      <motion.div
        className="something-outer"
        variants={{ animate: { width: "100%" } }}
        animate="animate"
        transition={{ duration: 2, ease: [0.6, 0.01, -0.05, 0.9] }}
        layoutId="123"
      >
        <Link href={"/test"}>
          <motion.img initial={{ scale: 1.1 }} src="/images/test_0.jpeg" alt="alt" />
        </Link>
      </motion.div>
      {/* message animation */}
      <motion.div
        className="message"
        variants={{
          animate: {
            transition: {
              duration: 1,
              delayChildren: 1,
              staggerChildren: 0.1,
            },
          },
        }}
        // endpoint의 애니메이션의 설정을 패런트에서 해준다.
        initial="initial"
        animate="animate"
      >
        {"something...".split("").map((v: any) => (
          <motion.span
            variants={{
              initial: { y: 300, opacity: 0 },
              animate: {
                y: 0,
                opacity: 1,
                // transition: { duration: 1 },
                // transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] },
                transition: { duration: 1, ease: "easeOut" },
              },
            }}
          >
            {v}
          </motion.span>
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
    height: 100px;
    /* border: 2px solid; */
    position: absolute;
    place-self: center;
    font-size: 70px;
    overflow: hidden;
    span {
      display: inline-block;
    }
  }
`;
