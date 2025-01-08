import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const errorClass =
  "text-error-100 pl-0.5 text-sm mt-1 font-normal !text-left block";

const InputBox = ({
  isError = false,
  errorMessage,
  className,
  variant,
  disableClass = "disabled:bg-neutral-100 disabled:border-neutral-100 disabled:placeholder:text-erro-500",
  disabled,
  type = "text",
  register,
  id,
  dbName,
  isLabel,
  labelFor,
  labelText,
  labelClass,
  placeholder,
  parentClass,
  labelFontSize='text-xs',
  labelColor='text-neutral-800 text-opacity-40',
  ...property
}) => {
  const inputSize = {
    Default: "Default",
    Small: "Small",
    Large: "Large",
  };

  const inputStyle = {
    Default: "px-4 py-[10px]",
    Small: "p-2",
    Large: "px-4 py-3",
  };

  return (
    <div className={`relative ${parentClass}`}>
      {labelText && (
        <label
          labelfor={labelFor}
          className={`block mb-2.5 font-light ${labelFontSize} cursor-pointer ${labelColor} ${labelClass}`}
        >
          {labelText}
        </label>
      )}
      <div className="relative">

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...(register && { ...register(dbName || "name") })}
          className={classNames(
            [className, disableClass],
            "focus:outline-none input-element rounded px-2 pb-[9px] pt-[11px] ld:px-2.5 ld:pb-[11px] ld:pt-[13px] text-black text-sm w-full font-light placeholder-secondary-250 placeholder-opacity-70",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            isError
              ? 'border border-error-100 error-shadow focus:border-black focus:shadow-none'
              : "border border-secondary-350 focus:border-black"
          )}
          {...property}
        />
        <span className={`${isError ? ' input-focus-error' :''} input-focus`}></span>
      </div>
      {errorMessage && (
        <span id='error-message' className={`${errorClass} select-none`}> {errorMessage} </span>
      )}
    </div>
  );
};

export default InputBox;

InputBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autocomplete: PropTypes.oneOf(["on", "off"]),
  autofocus: PropTypes.bool,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  isError: PropTypes.bool,
  errorClass: PropTypes.string,
  register: PropTypes.func,
  disableClass: PropTypes.string,
  variant: PropTypes.string,
  isLabel: PropTypes.bool,
  labelText: PropTypes.string,
  labelFor: PropTypes.string,
  labelClass: PropTypes.string,
};
