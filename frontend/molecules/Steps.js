import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const stepView = {
  horizontal: "horizontal",
  vertical: "vertical",
};
const stepTypes = {
  icon: "icon",
  noIcon: "noIcon",
  empty: "empty",
};
const titlePosition = {
  top: "top",
  bottom: "bottom",
};

const StepList = ({
  types = "icon",
  view = "horizontal",
  className = "",
  stepNum,
  title,
  status,
  position
}) => {
  return (
    <div
      view={view}
      types={types}
      status={status}
      position={position}
      className={classnames([className], "relative after:content-[''] last:flex-none last:after:hidden", {
        "flex items-center flex-auto after:w-full after:h-0.5": view === stepView.horizontal,
        "after:absolute after:left-4 after:top-2 after:w-0.5 after:h-full pb-14 last:pb-0": view === stepView.vertical,
        "after:left-[3px]": types === stepTypes.empty,
        "after:bg-primary-900": status === "completed",
        "after:bg-neutral-300": status === "current",
      })}>
      <div className="flex items-center relative text-sm z-10">
        <div className={classnames([className], "flex items-center justify-center rounded-full overflow-hidden after:absolute after:content-[''] after:w-4 after:h-4 after:rounded-full", {
          "w-8 h-8 after:hidden": types === stepTypes.icon,
          "indent-10 border-neutral-300 w-8 h-8 after:block": types === stepTypes.noIcon,
          "indent-10 w-2 h-2 after:hidden outline outline-4 outline-white": types === stepTypes.empty,
          " bg-primary-900 text-white after:bg-white": status === "completed",
          "bg-white border-[1px] border-primary-900 text-primary-900 after:bg-primary-900": status === "current",
          "bg-white border-[1px] border-neutral-300 text-neutral-600 after:bg-neutral-300": status === "notStated",
        })}>{stepNum}</div>
        <div
          className={classnames([className], {
            "left-2/4 -translate-x-2/4 text-center w-28": view === stepView.horizontal,
            "ml-2": view === stepView.vertical,
            "absolute": view === stepView.horizontal,
            "top-10 icon": types === stepTypes.icon,
            "top-10": types === stepTypes.noIcon,
            "top-4": types === stepTypes.empty,
            "-top-8": position === titlePosition.top,
            "text-neutral-900": status === "completed",
            "text-primary-900": status === "current",
            "text-neutral-600": status === "notStated",
          })}>{title}</div>
      </div>
    </div>
  );
};

const Steps = ({ className, types, view, position, stepListData }) => {
  return (
    <div className={classnames([className], {
      "px-9 py-6": view === stepView.horizontal,
      "p-0": view === stepView.vertical,
    })}>
      <div className={classnames([className], "flex", {
        "flex-row": view === stepView.horizontal,
        "flex-col": view === stepView.vertical,
      })}>
        {stepListData.map(({ stepNum, title, status }) => (
          <StepList types={types} view={view} stepNum={stepNum} title={title} position={position} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Steps;

Steps.propTypes = {
  view: PropTypes.array,
  types: PropTypes.array,
  stepListData: PropTypes.array,
};
