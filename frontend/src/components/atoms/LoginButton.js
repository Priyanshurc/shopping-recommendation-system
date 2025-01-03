import React from "react";
import NextImage from "next/image";
import Text from "atoms/Text";
const LoginButton = ({
  bgColor,
  textColor,
  btnText,
  imgSrc,
  className,
  ...OtherProps
}) => {
  return (
    <div
      className={`rounded-[10px] ${bgColor} flex justify-center items-center gap-x-3 py-[10px] px-[30px] transition-all ease-linear duration-700 cursor-pointer active:scale-90 ${className}`}
      {...OtherProps}
    >
      <NextImage src={imgSrc} width={23} height={23} />
      <Text variant="bodyLarge" textColor={textColor} className="mt-1">
        {btnText}
      </Text>
    </div>
  );
};

export default LoginButton;
