import { motion } from "framer-motion";
import styled from "styled-components";
const parent = {
  animate: {
    transition: {
      // 페런트 변수에 칠드런의 지연과 시차를 설정한다
      // 칠드런의 각각의 애니메이션이 실행되는 시간을 다르게 설정하기 위해서 패런트에서 설정해준다
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};
const children = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      // 칠드런 변수에 타이밍펑션과 듀레이션을 설정한다
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};
export default function Stagger() {
  return (
    <Box
      // 시간차를 다르게 하기 위한, 패런트의 커스텀 트랜지션 설정 (항상 패런트에서 설정)
      variants={parent}
      // 커스텀 변수명으로 설정
      initial="initial"
      animate="animate"
    >
      {["aaa", "bbb", "ccc"].map((item: any) => (
        <motion.div
          // 칠드런의 커스텀 트렌지션 설정
          variants={children}
        >
          {item}
        </motion.div>
      ))}
    </Box>
  );
}
const Box = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;
