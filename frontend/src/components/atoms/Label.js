import PropTypes from "prop-types";

const Label = ({
  labelFor = "",
  variant = "",
  textColor = "text-neutral-900",
  fontWeight = "",
  className = "",
  children,
  labelDisable = false,
}) => {
  const LabelType = {
    small: "small",
    medium: "medium",
    large: "large",
  };

  const LabelStyle = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <label
      htmlFor={`${labelFor}`}
      variant={LabelType[variant]}
      className={`${
        LabelStyle[variant]
      } ${textColor} ${fontWeight}  ${className} ${
        labelDisable && "opacity-60 pointer-events-none"
      }`}
    >
      {children}
    </label>
  );
};

export default Label;

Label.propTypes = {
  labelFor: PropTypes.string,
  variant: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
