import PropTypes from "prop-types";
import IcomoonIcon from "./IcomoonIcon";

const Checkbox = ({
  id,
  name,
  htmlFor,
  className,
  checked,
  label,
  classForCheckBox,
  onChange,
  disabled = false
}) => {
  return (
    <label
      className={`relative  flex items-center text-black text-opacity-70 text-base md:text-sm gap-x-2 font-light ${ disabled ? 'cursor-not-allowed' : 'cursor-pointer' } ${className}`}
      htmlFor={htmlFor}
    >
      <input
        type="checkbox"
        name={name}
        className="appearance-none peer"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={`relative border border-[#979797] flex items-center justify-center w-[26px] h-[26px] rounded bg-white  peer-checked:border-white ${ disabled ? 'cursor-not-allowed peer-checked:bg-[#B6B6B6]' : 'cursor-pointer peer-checked:bg-black' } ${classForCheckBox}`}
      >
        <IcomoonIcon
          icon="checkMark"
          color="#FFF"
          className="w-3 h-3"
        />
      </span>
      {label}
    </label>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  classForCheckBox: PropTypes.string,
  onChange: PropTypes.func,
  htmlFor: PropTypes.string,
  disabled : PropTypes.bool
};
