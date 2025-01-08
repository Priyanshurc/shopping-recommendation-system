import Heading from "atoms/Heading";
import Icon from "atoms/Icon";
import Text from "atoms/Text";
import Tooltip from "molecules/ToolTip";
import React from "react";
import dynamic from "next/dynamic";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultChartOptions = {
  grid: {
    show: false,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  legend: {
    show: false,
  },
  colors: ["#83BF6E"],
  chart: {
    height: "100%",
    type: "line",
    toolbar: {
      show: false,
    },
    fontFamily: "Inter, sans-serif",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 4,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "category",
    labels: {
      show: false,
    },
    categories: ["Apr", "May", "Jun", "July", "Aug", "Sep"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
};

const DashboardCard = ({
  iconSrc,
  iconBackground = "bg-black",
  title,
  count,
  increment,
  decrement,
  growthCount,
  id,
  className = "",
  bgColor = "",
  showChart = false,
  showIncrement = true,
  chartOptions,
  chartSeries,
  showIncremenText= true,
  incrementText = 'this week',
  showIcon = true,
  tooltipText = '',
  countClass = '',
  showPercentile= true,
  children,
  subText,
}) => {
  return (
    <div
      className={`flex flex-col gap-2  p-8 rounded-xl font-inter ${bgColor} ${className}`}
    >
      {showIcon && (
        <div
          className={`overflow-hidden w-12 h-12 flex items-center justify-center rounded-full ${iconBackground}`}
        >
          <Icon iconSrc={iconSrc} iconAlt="attachnent" className="" />
        </div>
      )}

      <div className="flex mt-3 gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Text
              variant="body"
              className="text-[13px] font-semibold leading-[1.2] text-neutral-5"
            >
              {title}
            </Text>
            {tooltipText && (
              <Tooltip
                className="text-xs"
                title={<AiFillInfoCircle />}
                content={tooltipText}
                position="top"
              />
            )}
          </div>
          <Heading
            type="h1"
            className={`font-semibold text-5xl tracking-[-1.44px] ${countClass}`}
          >
            {count}
          </Heading>

          {showIncrement && (
            <div className="flex items-center">
              <div className="bg-neutral-1 flex items-center text-sm weight p-1 rounded-lg text-neutral-4">
                {increment ? (
                  <IoIosArrowRoundUp className="text-success-1 text-[19px]" />
                ) : (
                  <IoIosArrowRoundDown className="text-error-1 text-[19px]" />
                )}
                <Text variant="body" className="text-[13px] font-bold">
                  <span
                    className={` font-bold ${
                      increment ? "text-success-1" : "text-error-1"
                    }`}
                  >
                    {growthCount} {showPercentile && '%'}{" "}
                  </span>
                  {showIncremenText && (
                    <span className="text-[12px] text-neutral-4 font-bold">
                      {incrementText}
                    </span>
                  )}
                </Text>
              </div>
            </div>
          )}
          {subText && (
           <span className="text-[14px] text-neutral-4 font-bold">
            {subText}
          </span>
          )}
        </div>
        {showChart && (
          <div>
            <div id="revenue-chart" className="w-[80px]">
              <Chart
                options={chartOptions || defaultChartOptions}
                series={ chartSeries ||[
                  {
                    name: "Earning",
                    data: [500, 1600, 1100, 1400, 1700, 800],
                  },
                ]}
                type="line"
                height={80}
                //   width={80}
              />
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
