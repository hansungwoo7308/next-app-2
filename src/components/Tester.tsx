import styled from "styled-components";
import { Transition, Variants, motion, useScroll, useTransform } from "framer-motion";
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
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body")?.classList.add("no-scroll");
    } else {
      document.querySelector("body")?.classList.remove("no-scroll");
    }
  }, [canScroll]);

  const messageVariants = {
    animate: {
      transition: {
        duration: 1,
        delayChildren: 1,
        staggerChildren: 0.1,
      },
    },
  };

  const messageChildVariants = {
    initial: { y: -300, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 4,
        type: "spring",
        damping: 10,
        stiffness: 400,

        //
      },
      // transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] },
    },
  };

  return (
    <Box>
      <motion.div
        className="something-outer"
        layoutId="123"
        // onAnimationComplete={() => setCanScroll(true)}
        variants={{ animate: { width: "100%" } }}
        animate="animate"
        transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
      >
        <Link href={"/test"}>
          <motion.img
            className="image"
            initial={{ scale: 1.1 }}
            src="/images/test_0.jpeg"
            alt="alt"
          />
        </Link>
      </motion.div>

      <motion.div
        className="message"
        variants={messageVariants}
        initial="initial"
        animate="animate"
      >
        {"something...".split("").map((v: any) => (
          <motion.span variants={messageChildVariants}>{v}</motion.span>
        ))}
      </motion.div>
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
