import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Text from "atoms/Text";

const AccordianExpand = ({
  heading,
  children,
  isExpanded = false,
  headingClass = "",
  iconClass = "",
  className = "",
}) => {
  const [collapsed, setCollapsed] = useState(isExpanded);
  const toggleCollapse = (item) => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    setCollapsed(isExpanded);
  }, [isExpanded]);
  return (
    <>
      <div
        className={`flex font-inter justify-between items-center gap-1 ${className}`}
        onClick={() => toggleCollapse()}
      >
        <Text
          fontSize="text-[20px]"
          fontWeight="font-semibold"
          textColor="text-neutral-7"
          className={headingClass}
        >
          {heading}
        </Text>
        <div>
          <IoIosArrowDown
            className={`text-[22px] transition-all cursor-pointer ${iconClass} ${
              collapsed ? "rotate-180" : "rotate-00"
            }`}
          />
        </div>
      </div>
      {collapsed && (
        <motion.section
          initial={{
            height: 0,
          }}
          animate={{
            height: "auto",
          }}
          exit={{
            height: 0,
          }}
        >
          {children}
        </motion.section>
      )}
    </>
  );
};

export default AccordianExpand;
