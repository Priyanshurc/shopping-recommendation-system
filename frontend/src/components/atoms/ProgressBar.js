import classnames from "classnames";
import PropTypes from "prop-types";

const progressBarStyle = {
  rounded: "rounded",
  soft: "soft",
  sharp: "sharp",
};

const sizes = {
  default: "default",
  small: "small",
};

const ProgressBar = ({
  style = progressBarStyle.rounded,
  size = sizes.small,
  hideLabel = false,
  background = "bg-neutral-200",
  activeBackground = "bg-primary-900",
  className = "",
  value = "40%",
}) => {
  return (
    <>
      {!hideLabel && (
        <div className="flex mb-2 text-sm justify-between text-neutral-800">
          <span>On Going</span>
          <span>45%</span>
        </div>
      )}

      <div
        className={classnames([className], "w-full", background, {
          "rounded-full": style === progressBarStyle.rounded,
          rounded: style === progressBarStyle.soft,
          "rounded-none": style === progressBarStyle.sharp,
        })}>

        <div
          style={{ width: value }}
          className={classnames(
            [className],
            "w-full flex items-center", className,
            activeBackground,
            {
              "rounded-full": style === progressBarStyle.rounded,
              rounded: style === progressBarStyle.soft,
              "rounded-none": style === progressBarStyle.sharp,
              "h-4": size === sizes.default,
              "h-2": size === sizes.small,
            }
          )}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
ProgressBar.propTypes = {
  style: PropTypes.array,
  size: PropTypes.array,
  value: PropTypes.string,
  hideLabel: PropTypes.bool,
  background: PropTypes.string,
  activeBackground: PropTypes.string,
};
