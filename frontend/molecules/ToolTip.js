import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
const Tooltip = ({
  position = tooltipPosition.top,
  title,
  tooltipClass = "",
  titleClass = "",
  content,
  className,
}) => {
  const tooltipPosition = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    topLeft: "topLeft",
    topRight: "topRight",
    bottomLeft: "bottomLeft",
    bottomRight: "bottomRight",
  };
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative w-fit"
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <div className={`content ${titleClass}`}>{title}</div>
      {active && (
        <div
          position={position}
          className={classnames([className], `tooltip bg-neutral-800 text-white py-2 px-4  max-w-xs text-center rounded text-base absolute before::content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-solid before:border-transparent ${tooltipClass}`, {
            "bottom-full left-2/4 -translate-x-2/4 mb-2 before:-bottom-4 before:border-t-neutral-800 before:left-2/4 before:-translate-x-2/4": position === tooltipPosition.top,

            "top-full left-2/4 -translate-x-2/4 mt-2 before:-top-4 before:border-b-neutral-800 before:left-2/4 before:-translate-x-2/4": position === tooltipPosition.bottom,

            "right-full top-2/4 -translate-y-2/4 mr-3 before:-right-4 before:border-l-neutral-800 before:top-2/4 before:-translate-y-2/4": position === tooltipPosition.left,

            "left-full top-2/4 -translate-y-2/4 ml-3 before:-left-4 before:border-r-neutral-800 before:top-2/4 before:-translate-y-2/4": position === tooltipPosition.right,

            "bottom-full right-0 -mr-2 mb-2 before:-bottom-4 before:border-t-neutral-800 before:right-0 before:-translate-x-2": position === tooltipPosition.topLeft,

            "bottom-full left-0 -ml-2 mb-2 before:-bottom-4 before:border-t-neutral-800 before:left-0 before:translate-x-2": position === tooltipPosition.topRight,

            "top-full right-0 -mr-2 mt-2 before:-top-4 before:border-b-neutral-800 before:right-0 before:-translate-x-2": position === tooltipPosition.bottomLeft,

            "top-full left-0 -ml-2 mt-2 before:-top-4 before:border-b-neutral-800 before:left-0 before:translate-x-2": position === tooltipPosition.bottomRight,
          })}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
Tooltip.propTypes = {
  title: PropTypes.string,
  tooltipClass: PropTypes.string,
  content: PropTypes.string,
  position: PropTypes.array,
};
