import Text from "../atoms/Text";
import React from "react";

const SideBySideElements = ({
  children,
  label,
  textClass,
  textVariant,
  childrenClassname,
  labelWidth,
  ...property
}) => {
  return (
    <div className={`flex ${property.className}`}>
      <Text
        variant={textVariant}
        className={`${textClass} ${labelWidth || "w-[150px]"} `}
      >
        {label}
      </Text>
      <div className={`${childrenClassname}`}>{children}</div>
    </div>
  );
};

export default SideBySideElements;
