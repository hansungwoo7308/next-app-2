import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default forwardRef(function ForwardedMotionDiv({ children, ...rest }: any, ref: any) {
  console.log({ rest });
  return (
    <motion.div
      ref={ref}
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 3 }}
      // {...rest}
    >
      {children}
    </motion.div>
  );
});
