import Heading from "atoms/Heading";
import Text from "atoms/Text";
import Tooltip from "molecules/ToolTip";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

const PerformanceCard = ({
  title,
  weekCount,
  weekBgColor,
  weekBgWidth,
  monthCount,
  monthBgColor = 'bg-[#FFBC99]',
  monthBgWidth = 70,
  monthTitle = 'Last Month',
  weekTitle = 'This week',
  isIncrement,
  growthCount,
  id,
  className = "",
  bgColor = "",
  showIncrement = true,
  tooltipContent = "",
  growthText = "difference",
  showGrowthSlide = true,
  showAgreementTag = false,
  agreementDay = '',
  agreementText = '',
}) => {
  return (
    <div
      className={`flex flex-col gap-2 px-4 p-5 rounded-xl ${bgColor} ${className}`}
    >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <p className="text-[13px] font-semibold leading-[1.2] text-neutral-5">
              {title}
            </p>
            <Tooltip
              className="text-xs"
              title={<AiFillInfoCircle />}
              content={tooltipContent}
              position="top"
            />
          </div>

          <div className="flex gap-4 mt-4 max-w-[280px]">
            <div className=" w-full">
              <div className="flex items-center justify-between gap-3">
                <p className="whitespace-nowrap text-[13px] font-semibold leading-[1.2] text-neutral-4">
                  {weekTitle}
                </p>
                <Heading
                  type="h2"
                  className="font-semibold text-[24px] "
                >
                  {weekCount}
                </Heading>
              </div>
              { showGrowthSlide && (
                <div className="w-full h-[10px] bg-[#D9D9D9] rounded-lg mt-4">
                  <div
                    className={`h-full rounded-lg ${weekBgColor}`}
                    style={{width: weekBgWidth+'%'}}
                  />
                </div>
              )}
            </div>

            <div className=" w-full ">
              <div className="flex items-center justify-between gap-3">
                <p className="whitespace-nowrap text-[13px] font-semibold leading-[1.2] text-neutral-4">
                  {monthTitle}
                </p>
                <Heading
                  type="h2"
                  className="font-semibold text-[24px]"
                >
                  {monthCount}
                </Heading>
              </div>
              {showGrowthSlide && (
                <div className="w-full h-[10px] bg-[#D9D9D9] rounded-lg mt-4">
                  <div
                    className={`h-full rounded-lg ${monthBgColor}`}
                    // className={`w-[${monthBgWidth}%] h-full rounded-lg ${monthBgColor}`}
                    style={{width: monthBgWidth+'%'}}
                  />
                </div>
              )}
            </div>
          </div>

          {showIncrement && (
            <div className="flex items-center mt-2">
              <div className="bg-neutral-1 flex items-center text-sm weight p-1 rounded-lg text-neutral-4">
                {isIncrement ? (
                  <IoIosArrowRoundUp className="text-success-1 text-[19px]" />
                ) : (
                  <IoIosArrowRoundDown className="text-error-1 text-[19px]" />
                )}
                <Text variant="body" className="text-[13px] font-bold">
                  <span
                    className={` font-bold ${
                      isIncrement ? "text-success-1" : "text-error-1"
                    }`}
                  >
                    {growthCount}%{" "}
                  </span>
                  <span className="text-[12px] text-neutral-4 font-bold">
                    {growthText}
                  </span>
                </Text>
              </div>
            </div>
          )}
           {showAgreementTag && (
            <div className="flex items-center mt-4 mb-6">
              <div className="bg-neutral-1 flex items-center text-sm weight p-1 rounded-lg text-neutral-4">
                
                <Text variant="body" className="text-[13px] text-neutral-4"> 
                  <span
                    className={``}
                  >
                   {agreementDay + ": "}
                  </span>
                  <span className="text-[12px] text-neutral-4 font-bold">
                    {/* {growthText} */}
                    {agreementText}
                  </span>
                </Text>
              </div>
            </div>
          )}

        </div>
    </div>
  );
};

export default PerformanceCard;
