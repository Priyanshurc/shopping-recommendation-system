import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../atoms/Button";

const Popover = ({ id = "", position = "top", popoverWidth = "w-80", arrow = true, radius = "rounded", className, title, children, hoverText }) => {
  const popoverPosition = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    topLeft: "topLeft",
    topRight: "topRight",
    bottomLeft: "bottomLeft",
    bottomRight: "bottomRight",
    leftTop: "leftTop",
    leftBottom: "leftBottom",
    rightTop: "rightTop",
    rightBottom: "rightBottom",
  };
  return (
    <div className="relative w-fit group">
      <Button label={hoverText} />
      <div id={id} position={position}
        className={classnames([className], `bg-white drop-shadow-md hidden group-hover:flex absolute before::content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-solid before:border-transparent ${arrow ? "before:inline-flex" : "before:hidden"} ${popoverWidth} ${radius} ${className}`, {
          "bottom-full left-2/4 -translate-x-2/4 mb-2 before:-bottom-4 before:border-t-white before:left-2/4 before:-translate-x-2/4": position === popoverPosition.top,

          "top-full left-2/4 -translate-x-2/4 mt-2 before:-top-4 before:border-b-white before:left-2/4 before:-translate-x-2/4": position === popoverPosition.bottom,

          "right-full top-2/4 -translate-y-2/4 mr-3 before:-right-4 before:border-l-white before:top-2/4 before:-translate-y-2/4": position === popoverPosition.left,

          "left-full top-2/4 -translate-y-2/4 ml-3 before:-left-4 before:border-r-white before:top-2/4 before:-translate-y-2/4": position === popoverPosition.right,

          "bottom-full right-0 -mr-2 mb-2 before:-bottom-4 before:border-t-white before:right-[20px] before:-translate-x-2": position === popoverPosition.topLeft,

          "bottom-full left-0 -ml-2 mb-2 before:-bottom-4 before:border-t-white before:left-[20px] before:translate-x-2": position === popoverPosition.topRight,

          "top-full right-0 -mr-2 mt-2 before:-top-4 before:border-b-white before:right-[20px] before:-translate-x-2": position === popoverPosition.bottomLeft,

          "top-full left-0 -ml-2 mt-2 before:-top-4 before:border-b-white before:left-[20px] before:translate-x-2": position === popoverPosition.bottomRight,
          "right-full -top-4 mr-3 before:-right-4 before:border-l-white before:top-[20px]": position === popoverPosition.leftTop,
          "right-full -bottom-4 mr-3 before:-right-4 before:border-l-white before:bottom-[20px]": position === popoverPosition.leftBottom,
          "left-full -top-4 ml-3 before:-left-4 before:border-r-white before:top-[20px] ": position === popoverPosition.rightTop,
          "left-full -bottom-4 ml-3 before:-left-4 before:border-r-white before:bottom-[20px]": position === popoverPosition.rightBottom,
        })}
      >
        {children}

      </div>
    </div>
  );
};

export default Popover;

Popover.propTypes = {
  className: PropTypes.string,
  popoverPosition: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string,
  hoverText: PropTypes.string,
};