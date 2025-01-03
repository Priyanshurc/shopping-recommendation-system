import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxImage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["17%", "-17%"]);
  return (
    <div
      className="overflow-hidden h-full max-w-[500px] m-auto pt-20"
      ref={ref}
    >
      <motion.img
        src="/images/white-car.png"
        alt=""
        className="w-full transform scale-110"
        style={{ translateY: translateY }}
      />
    </div>
  );
};

export default ParallaxImage;
