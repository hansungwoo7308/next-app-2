import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const variants: any = {
  animate: { width: "100%" },
};
const transition = { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] };
export default function Tester() {
  return (
    <Box>
      <motion.div
        className="something-outer"
        variants={variants}
        animate="animate"
        transition={transition}
        layoutId="123"
      >
        <Link href={"/test"}>
          <motion.img initial={{ scale: 1.1 }} src="/images/test_0.jpeg" alt="alt" />
        </Link>
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
`;
