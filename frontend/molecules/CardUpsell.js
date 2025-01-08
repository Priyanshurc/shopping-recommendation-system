import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Text from "atoms/Text";
import Tooltip from "./ToolTip";
import { AiFillInfoCircle } from "react-icons/ai";
import { Cross, CheckmarkList, ShieldCheck, ShieldCross, NoProtection, Enhanced, Elite } from "assets/Icons";
import CustomImage from "organisms/CustomImage";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import InputBox from "atoms/zenovo-sass/InputBox";
import { formatCurrency } from "helpers/utilities";

const CardUpsell = ({
  id,
  heading = "",
  headingIcon = "check",
  tooltip = "",
  subHeading = "",
  tag = "",
  isSelected = false,
  className = "",
  type,
  vehicle,
  priceHeading = "Price",
  strikeThroughPrice,
  costPerDay = 0,
  finalPrice,
  discountedPercentage,
  discountedAmount,
  currency = "",
  onClick,
  highlights,
  highlightsIcon = "check",
  showTag = true,
  subHeadingClassName = "",
  tooltipContent = "",
  showDiscountControl = false,
  children,
  index = 0
}) => {
  const tags = {
    "Best deal": "/images/icons/star-rounded.svg",
    "Combo Deal": "/images/icons/star-rounded.svg",
    Upgrade: "/images/icons/star.svg",
    "Low Mileage": "/images/icons/speed.svg",
    "Value for Money": "/images/icons/car_tag.svg",
  };
  const listImage = {
    Check: "/images/icons/close-black.svg",
    cross: "/images/icons/close-black.svg",
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = (item) => {
    setCollapsed(!collapsed);
  };

  const highlightText = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 0 ? part : <strong className="text-primary-1" key={index}>{part}</strong>
    );
  };

  return (
    <div
      id={id}
      className={`flex bg-white  flex-col justify-between items-start cursor-pointer  font-inter shadow-lg rounded-xl px-4 py-5    ${
        isSelected ? "border-2 border-primary-1" : "border-2 border-transparent"
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex w-full justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className={`flex gap-2.5 ${showTag ? "w-28 lg:w-44" : ""}`}>
            {headingIcon === "cross" ? (
                <ShieldCross />
              ) : index === 0 ? (
                <NoProtection />
              ) : index === 1 ? (
                <Enhanced />
              ) : index === 2 ? (
                <Elite />
              ) : (
                <ShieldCheck size={9} />
              )}
              <Text
                fontSize="text-[14px]"
                fontWeight="font-semibold"
                className="text-neutral-5 "
                title={heading}
              >
                {heading}
              </Text>
              {tooltip && (
                <Tooltip
                  className="text-xs"
                  heading={<AiFillInfoCircle />}
                  content={tooltip}
                  position="top"
                />
              )}
            </div>
            {subHeading && (
              <Text
                fontSize="text-[12px]"
                className={`${
                  subHeadingClassName ? subHeadingClassName : "text-primary-5"
                }`}
              >
                {subHeading}
              </Text>
            )}
          </div>
        </div>
        {showTag && (
          <div className="self-start">
            <div className="blue-gradient grid grid-cols-[14px_1fr] items-start rounded-md text-white px-2 ">
              <div className="w-[12px]">
               {tag &&
                <Image
                  src={tags[tag]}
                  width={12}
                  height={12}
                  alt="icon"
                  className="block"
                />
                }
              </div>
              <Text
                 fontSize="text-[10px]"
                 fontWeight="font-normal"
                 textColor="text-white"
                 className="align-bottom my-auto whitespace-nowrap"
              >
                {tag}
              </Text>
            </div>
          </div>
        )}
      </div>

      <div className="flex  flex-col w-full mt-4 sm:gap-1 gap-2 item h-full justify-between">
        <span className="ml-4">
          {highlights?.map((i) => (
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2">
                {i?.available ? (
                  <CheckmarkList size={9} />
                ) : (
                  <Cross size={7} />
                )}
              </div>
              <Text variant="caption" textColor="text-neutral-900">{highlightText(i.text)}</Text>
            </div>
          ))}
        </span>
        <div>
          {showDiscountControl && (
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
              <span className="text-neutral-5 inline-block text-[12px] font-semibold">Price/day</span>
              <Tooltip
                className="text-xs"
                title={<AiFillInfoCircle color="gray" />}
                content={tooltipContent}
                position="top"
              />
            </div>
            <InputBox
              type={"text"}
              defaultValue={pricePerDay}
              onChange={(e) => console.log(e.target.value)}
           
            />
          </div>
          )}
          <PriceSection
            priceHeading={priceHeading}
            actualPrice={strikeThroughPrice}
            discountedPercentage={discountedPercentage}
            discountedAmount={discountedAmount}
            priceAfterDiscount={finalPrice}
            currency={currency}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

const PriceSection = ({
  priceHeading,
  actualPrice,
  discountedPercentage,
  discountedAmount,
  priceAfterDiscount,
  currency,
}) => {
  return (
    <div className="flex justify-between items-center bg-neutral-3 rounded py-3 px-2.5 mt-5">
      <Text fontSize="text-[12px]" fontWeight="font-medium">
        {priceHeading}
      </Text>

      <div className="text-right">
        {actualPrice && (
          <Text fontSize="text-[12px]" textColor="text-neutral-shades-2">
            {" "}
            {discountedPercentage > 0 || discountedAmount > 0 ?
              <>
                <span className="line-through">{formatCurrency(actualPrice,currency)}</span>{" "}
                { discountedPercentage > 0 ?
                  <span>({discountedPercentage}% off)</span> :
                  <span>({discountedAmount} off)</span>
                }
              </> : 
                <br />
            }
          </Text>
        )}
        <Text fontSize="text-[12px]">
          <span className="font-semibold">{formatCurrency(priceAfterDiscount,currency)}</span> {currency}
        </Text>
      </div>
    </div>
  );
};

export default CardUpsell;

CardUpsell.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  tooltip: PropTypes.string,
  tag: PropTypes.string,
  discountPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  price: PropTypes.string,
  onClick: PropTypes.func,
  highlights: PropTypes.array,
  type: PropTypes.arrayOf[("image", "list")],
  vehicle: PropTypes.object,
  costPerDay: PropTypes.number,
};
