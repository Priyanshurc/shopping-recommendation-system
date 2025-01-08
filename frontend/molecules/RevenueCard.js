import React from "react";
import PropTypes from "prop-types";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const RevenueCard = ({
  value = "",
  heading = "",
  currentMonth = '',
  lastMonth = '',
  isIncrement = true,
  className = '',
}) => {
  return (
    <div
    className={`flex items-center flex-col rounded-lg py-2 shadow ${className}`}
  >
    <div
      className={`flex items-center ${
        isIncrement ? "text-success-1" : "text-error-1"
      }`}
    >
      {isIncrement ? (
        <IoMdArrowDropup className="text-success-1 text-[29px]" />
      ) : (
        <IoMdArrowDropdown className="text-error-1 text-[29px]" />
      )}
      <span className="text-lg">{value}</span>
    </div>
    <p className="text-xl">{heading}</p>
    <div className="grid grid-cols-2 divide-x divide-slate-400 text-base mt-2">
      <div className="px-2 text-right">
        <p>{currentMonth}</p>
        <p>Current Month</p>
      </div>
      <div className="px-2">
        <p>{lastMonth}</p>
        <p>Last Month</p>
      </div>
    </div>
  </div>
  );
};

RevenueCard.propTypes = {
  percentage: PropTypes.string,
  heading: PropTypes.string,
  currentMonth: PropTypes.number,
  lastMonth: PropTypes.number,
  isIncrement: PropTypes.bool,
  className: PropTypes.string,
};

export default RevenueCard;
