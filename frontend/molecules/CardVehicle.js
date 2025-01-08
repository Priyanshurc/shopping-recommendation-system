import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Text from "atoms/Text";
import Tooltip from "./ToolTip";
import { AiFillInfoCircle } from "react-icons/ai";
import CustomImage from "organisms/CustomImage";
import {
  Speedometer,
} from "assets/Icons";
import { formatCurrency } from "helpers/utilities";
const CardVehicle = ({
  id,
  data_category = "",
  data_subHeading = "",
  tag = "",
  isSelected = false,
  className = "",
  type,
  data_passengers = 4,
  data_luggage = 2,
  data_transmissionTypeShortName = "A",
  data_fuelTypeShortName = "P",
  priceHeading = "Price",
  data_actualPrice,
  data_totalPriceAmount,
  costPerDay = "280",
  data_discountPercentage,
  data_currencyIsoCode = "",
  onClick,
  highlights,
  showTag = true,
  tagText = "",
  subHeadingClassName = "",
  acrissCode,
  mileage,
  data_vehicleImages,
  children,
  data_currentOdometer,
  data_acrissCode,
  isShowPriceDifferenceOnly = false,
  isShowDiscount = false,
  priceDifference,
  isAvailable = true,
  data_isSelected = false
}) => {
  console.log("data_vehicleImages", data_vehicleImages)
  if(isSelected){
    console.log("selected id", id)
  }
  const tags = {
    "Best deal": "/images/icons/star-rounded.svg",
    "Best Combo": "/images/icons/star-rounded.svg",
    "Upgrade": "/images/icons/star.svg",
    "Low Mileage": "/images/icons/speed.svg",
    "Best Value": "/images/icons/car_tag.svg",
  };
  console.log("data_category", data_category)
  console.log("priceDifference", priceDifference)
 
  return (
    <div
      id={id}
      className={`flex bg-white relative flex-col justify-between shadow-md items-center cursor-pointer  font-inter  rounded-xl px-4 py-5    ${
        isSelected ? "border-2 border-primary-1" : "border-2 border-neutral-2"
      } ${className}`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute -bottom-[16px]">
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7595 11.9873C10.0039 13.3879 7.99471 13.3879 7.23914 11.9873L0.772078 1.4385e-06L17.2266 0L10.7595 11.9873Z"
              fill="#2A85FF"
            />
          </svg>
        </div>
      )}
      <div className="flex w-full justify-between items-center gap-2">
        <div className="flex items-center gap-2">
         
          <div className="flex flex-col gap-1">
            <div className={`flex gap-2`}>
              <Text
                fontSize="text-[12px] lg:text-[14px]"
                fontWeight="font-semibold"
                className="text-primary-5"
                title={data_category}
              >
                {data_category}
              </Text>
            </div>
            {data_subHeading && (
              <Text fontSize="text-[12px]" className={`${subHeadingClassName ? subHeadingClassName : 'text-5'}`}>
                {data_subHeading}
              </Text>
            )}
          </div>
        </div>
        {showTag && (
          <div className="self-start">
            <div className="blue-gradient grid grid-cols-[14px_1fr] items-start rounded-md text-white px-2 ">
              <div className="w-[12px]">
                <Image
                  src={"/images/icons/star-rounded.svg"}
                  width={12}
                  height={12}
                  alt="icon"
                  className="block"
                />
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
      <div className="sm:gap-1 gap-2 w-full justify-between">
        <div className="relative h-[150px] mx-auto">
          <Image
            src={data_vehicleImages?.[0]?.url || "/images/cars/images/default_vehicle_image.png"}
            width={370}
            height={210}
            alt={data_subHeading || ""}
            className="m-auto"
            loading="eager"
            priority={true}
          />
        </div>
        <div className="w-full flex justify-between gap-2 ">
          <div className="flex flex-col">
            <div className="flex max-sm:flex-wrap flex-wrap gap-3 w-full">
              {data_passengers && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/icons/airline_seat_recline_extra.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text
                    title={`${data_passengers} seats`}
                    fontSize="text-[12px]"
                  >
                    {/* {data_passengers} */}
                    {typeof data_passengers === 'string' && data_passengers.charAt(0).toUpperCase()}
                  </Text>
                </div>
              )}
              {data_luggage && (
                <div className="flex  justify-center items-center">
                  <Image
                    src="/images/icons/travel_luggage_and_bags.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  {/* <Text fontSize="text-[12px]">{luggage}</Text> */}
                  <Text fontSize="text-[12px]">{data_luggage}</Text>
                </div>
              )}
              {data_transmissionTypeShortName && (
                <div className="flex gap-1 items-center">
                  <Image
                    src="/images/icons/auto_transmission.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text fontSize="text-[12px]">
                    {data_transmissionTypeShortName}
                  </Text>
                </div>
              )}
              {data_fuelTypeShortName && (
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/icons/local_gas_station.svg"
                    width={12}
                    height={12}
                    alt="icon"
                  />
                  <Text fontSize="text-[12px]" className="ml-[3px]">
                    {data_fuelTypeShortName}
                  </Text>
                </div>
              )}
             

               {/* {data_acrissCode && <Text fontSize="text-[12px]">{data_acrissCode}</Text>} */}
              
              {data_currentOdometer && <div className="flex items-center gap-1">
                  <Speedometer />
                  <Text fontSize="text-[12px]">{data_currentOdometer}</Text>
                </div>}
            </div>
            
            
          </div>
          <div className="w-full max-w-[110px]  border-l border-gray-200">
          <PriceSection
            actualPrice={isShowDiscount ? data_actualPrice : null}
            discountPercentage={isShowDiscount ? data_discountPercentage : null}
            priceAfterDiscount={isShowPriceDifferenceOnly ? priceDifference : data_totalPriceAmount}
            currency={data_currencyIsoCode}
            isShowPriceDifferenceOnly={isShowPriceDifferenceOnly}
            isAvailable={isAvailable}
            isSelected={data_isSelected}
          />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const PriceSection = ({
  actualPrice,
  discountPercentage,
  priceAfterDiscount,
  currency,
  isShowPriceDifferenceOnly = false,
  isAvailable = true,
  isSelected = false
}) => {
  return (
    <div className="text-right">
      {discountPercentage && actualPrice && (
        <Text fontSize="text-[10px]" textColor="text-neutral-shades-2">
          <span className="line-through">{formatCurrency(actualPrice,currency)}</span>
          <span>({discountPercentage}% off)</span>
        </Text>
      )}
      { (isAvailable || isSelected) && (priceAfterDiscount || priceAfterDiscount == 0) ? 
      <>
      <Text fontSize="text-[12px]" fontWeight="" textColor="">
        {isShowPriceDifferenceOnly ? (
          <span className="font-semibold">
            {priceAfterDiscount == "0" ? '' : '+'}
            {currency} {formatCurrency(priceAfterDiscount,currency)}
          </span>
        ) : (
          <span className="font-semibold">{formatCurrency(priceAfterDiscount,currency)}</span>
        )}
      </Text>
      <Text fontSize="text-[10px]">
        <span className="text-[10px]">per day</span>
      </Text>
      </> : <Text fontSize="text-[12px]">Sold Out</Text>
      }
    </div>
  );
};

export default CardVehicle;

CardVehicle.propTypes = {
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
  // vehicle: PropTypes.object,
};
