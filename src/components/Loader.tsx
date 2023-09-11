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
const imageTransition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };
const variants: any = {
  // initial: { width: "100%" },
  animate: { width: "300px", height: "300px" },
};
export default function Loader() {
  return (
    <Box>
      <motion.div
        className="something-outer"
        // transition={{ duration: 300 }}
        // animate={{ transformOrigin: "center", width: "300px", height: "300px" }}
        animate={{ originX: "0px", originY: "0px" }}
        layoutId="123"
        // variants={variants}
        // initial="initial"
        // animate="animate"

        // transition={{origin}}
        // animate={{ originX: "center", originY: "center" }}
        // initial="initial"
        // 시간차를 다르게 하기 위한, 패런트의 커스텀 트랜지션 설정 (항상 패런트에서 설정)
        // 커스텀 변수명으로 설정
        // animate="animate"
      >
        {/* {["image1", "image2", "image3", "image4"].map((item: any, index: any) => (
        <motion.div
          // 칠드런의 커스텀 트렌지션 설정
          variants={children}
          key={index}
          layoutId={index === 0 ? "something" : ""}
        >
          {item}
        </motion.div>
      ))} */}
        {/* <motion.div variants={children} layoutId="something">
          just
        </motion.div> */}
        {/* <motion.div
        // variants={children}
        // transition={transition}
        // whileHover={{ scale: 1.1 }}
        // // layoutId="something"
        // className="something"
        >
        </motion.div> */}
        {/* <Image src={"/images/test_0.jpeg"} alt="alt" width={1000} height={600}></Image> */}
        <Link href={"/works"}>
          <motion.img
            src="/images/test_0.jpeg"
            alt="alt"
            whileHover={{ scale: 1.1 }}
            className="something"
            // animate={{ objectFit: "cover" }}
            // initial={{ objectFit: "cover" }}
            // variants={children}
            transition={imageTransition}
            // layoutId="something"
          />
        </Link>
      </motion.div>
    </Box>
  );
}
const Box = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  /* gap: 10rem; */
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
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
