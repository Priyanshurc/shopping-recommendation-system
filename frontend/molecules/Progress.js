import { Tick } from "../../assets/Icons";
import React from "react";

const Progress = ({ steps = [], percentage, lineClass = "bg-neutral-3" }) => {
  return (
    <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
      {!!steps.length &&
        steps.map((step, index) => {
          const stepPercentage = ((index + 1) / steps.length) * 100;
          let activeClass = "";
          if (percentage >= stepPercentage) {
            activeClass = "bg-primary-1 border-primary-1";
          } else {
            activeClass = "bg-neutral-0 border-neutral-3";
          }
          return (
            <button
              key={index}
              className="relative flex flex-col items-center gap-2 cursor-default"
            >
              {index != 0 && (
                <span
                  className={`absolute w-[120%] h-[2px] ${
                    percentage >= stepPercentage ? "bg-primary-1" : lineClass
                  } top-3 transform right-[50%]`}
                ></span>
              )}

              <div
                className={`relative z-10 rounded-full p-[4px] w-6 h-6 flex justify-center items-center border-2 bg-neutral-0 border-neutral-3 
           ${activeClass}
              `}
              >
                <Tick />
              </div>
              <span className="flex text-[12px] font-[500] whitespace-nowrap">
                {step.stepLabel}
              </span>
            </button>
          );
        })}
    </div>
  );
};

export default Progress;
