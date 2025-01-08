import IcomoonIcon from "../atoms/IcomoonIcon";
import Text from "../atoms/Text";
import React from "react";

const SixElementContainer = ({
  firstText,
  secondText,
  thirdText,
  fourthText,
  fifthText,
  sixthText,
  textClasses,
  textWeight,
  textVariant = "bodySmall",
  fifthTextWeight,
  firstContainerClass = "w-[3.75rem]",
  secondContainerClass = "flex-grow",
  thirdContainerClass = "w-[10rem]",
  fourthContainerClass = "w-[5.5rem]",
  fifthContainerClass = " w-[7.5rem] text-right",
  sixthContainerClass = "w-[7.5rem] text-right",
  seventhContainerClass = "w-[3.75rem] flex justify-center items-center cursor-pointer",
  isEditable = false,
  isDeleteIcon = false,
  handleDelete,
  ...property
}) => {
  return (
    <div
      className={`flex gap-x-3 ${isEditable ? "pl-10 pr-0" : "pl-10 pr-10"} ${
        property.className
      }`}
    >
      <div className={firstContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={textWeight}
        >
          {firstText}
        </Text>
      </div>

      <div className={secondContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={textWeight}
        >
          {secondText}
        </Text>
      </div>

      <div className={thirdContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={textWeight}
        >
          {thirdText}
        </Text>
      </div>

      <div className={fourthContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={textWeight}
        >
          {fourthText}
        </Text>
      </div>

      <div className={fifthContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={fifthTextWeight || textWeight}
        >
          {fifthText}
        </Text>
      </div>

      <div className={sixthContainerClass}>
        <Text
          variant={textVariant}
          className={textClasses}
          fontWeight={textWeight}
        >
          {sixthText}
        </Text>
      </div>
      {isEditable && (
        <div className={seventhContainerClass}>
          {isDeleteIcon && (
            <span onClick={(e) => handleDelete(e)}>
              <IcomoonIcon icon={"delete"} size={"16"} color={"#6B6B80"} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SixElementContainer;
