import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Text from "atoms/Text";
import Tooltip from "./ToolTip";
import { AiFillInfoCircle } from "react-icons/ai";
import CustomImage from "organisms/CustomImage";
const CardSelect = ({
  id,
  heading = "",
  tooltip = "",
  subHeading = "",
  tag = "",
  isSelected = false,
  className = "",
  type,
  vehicle,
  priceHeading = "Price",
  actualPrice,
  priceAfterDiscount,
  discountPercentage,
  currency = "",
  onClick,
  highlights,
  showTag = true,
  subHeadingClassName = '',
  children,
}) => {
  const tags = {
    "Best deal": "/images/icons/star-rounded.svg",
    "Best Combo": "/images/icons/star-rounded.svg",
    "Upgrade": "/images/icons/star.svg",
    "Low Mileage": "/images/icons/speed.svg",
    "Best Value": "/images/icons/car_tag.svg",
  };
  return (
    <div
      id={id}
      className={`flex bg-white  flex-col justify-between items-center cursor-pointer  font-inter  rounded-xl px-4 py-5    ${
        isSelected ? "border-2 border-primary-1" : "border-2 border-neutral-2"
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex w-full justify-between items-center gap-2"> 
        <div className="flex items-center gap-2">
          <div className="w-[24px] h[24px]">
          {isSelected ? (
            <Image
              src={"/images/icons/arrow-tick-selected.svg"}
              width={24}
              height={24}
              alt="icon"
              className="transition scale-100 duration-300 ease-in-out"
            />
          ) : (
            <Image
              src={"/images/icons/radio-default.svg"}
              width={24}
              height={24}
              alt="icon"
            />
          )}
          </div>
          <div className="flex flex-col gap-1">
            <div className={`flex gap-2 ${showTag ? 'w-28 lg:w-44': ''}`}>
              {/* trim text if text is too long */}
              <Text
                fontSize="text-[13px]"
                fontWeight="font-semibold"
                className="text-neutral-5 overflow-hidden whitespace-nowrap text-ellipsis "
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
              <Text fontSize="text-[12px]" className={`${subHeadingClassName ? subHeadingClassName : 'text-primary-5'}`}>
                {subHeading}
              </Text>
            )}
          </div>
        </div>
        {showTag && (
          <div className="self-center max-w-[84px]">
            <div className="bg-[#F17A5E] grid  grid-cols-[14px_1fr] items-start rounded-lg text-white px-1.5 py-0.5">
              <div className="w-[12px h-[12px]">
                <Image src={tags[tag]} width={12} height={12} alt="icon" className="block"/>
              </div>
              <Text
                fontSize="text-[10px]"
                fontWeight="font-bold"
                textColor="text-white"
                className="align-bottom mt-1 whitespace-nowrap"
              >
                {tag}
              </Text>
            </div>
          </div>
        )}
      </div>

      {type === "image" && (
        <div className="flex max-sm:w-[200px] sm:gap-1 gap-2 w-full justify-between">
          <div>
            <CustomImage
              imageSrc={vehicle?.img}
              width={"124"}
              height={"100%"}
              alt={subHeading || ""}
              className="m-auto"
              loading="eager"
              priority={true}
            />
            <div className="flex ml-2 max-sm:flex-wrap gap-3">
              {vehicle?.seats && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/icons/airline_seat_recline_extra.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text title={`${vehicle?.seats} seats`} fontSize="text-[12px]">{vehicle?.seats}</Text>
                </div>
              )}
              {vehicle?.luggage && (
                <div className="flex  justify-center items-center">
                  <Image
                    src="/images/icons/travel_luggage_and_bags.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text fontSize="text-[12px]">{vehicle?.luggage}</Text>
                </div>
              )}
              {vehicle?.transmissionType && (
                <div className="flex gap-1 items-center">
                  <Image
                    src="/images/icons/auto_transmission.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text fontSize="text-[12px]">{vehicle?.transmissionType}</Text>
                </div>
              )}
              {vehicle?.gasType && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/icons/local_gas_station.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text fontSize="text-[12px]" className="ml-[3px]">
                    {vehicle?.gasType}
                  </Text>
                </div>
              )}
            </div>
          </div>

          <PriceSection
            priceHeading={priceHeading}
            actualPrice={actualPrice}
            discountPercentage={discountPercentage}
            priceAfterDiscount={priceAfterDiscount}
            currency={currency}
          />
        </div>
      )}

      {type === "list" && (
        <div className="flex ml-4 flex-col w-full mt-2 sm:gap-1 gap-2 item h-full justify-between">
          <span>
            {highlights?.map((i) => (
              <li className="text-[10px] md:text-[12px]">{i}</li>
            ))}
          </span>
          <PriceSection
            priceHeading={priceHeading}
            actualPrice={actualPrice}
            discountPercentage={discountPercentage}
            priceAfterDiscount={priceAfterDiscount}
            currency={currency}
          />
        </div>
      )}
      {children}
    </div>
  );
};

const PriceSection = ({ priceHeading, actualPrice, discountPercentage, priceAfterDiscount, currency}) => {
  return (
    <div className="self-end text-right">
      <Text fontSize="text-[12px]" textColor="text-neutral-5">
        {priceHeading}
      </Text>
      {actualPrice && (
        <Text fontSize="text-[10px]" textColor="text-neutral-shades-2">
          {" "}
          <span className="line-through">{currency} {actualPrice}</span>{" "}
          <span>({discountPercentage}% off)</span>
        </Text>
      )}
      <Text
        fontSize="text-[12px]"
        fontWeight="font-semibold"
        textColor="text-primary-5"
      >
        {currency} {priceAfterDiscount}
      </Text>
    </div>
  );
};

export default CardSelect;

CardSelect.propTypes = {
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
};
