import PropTypes from "prop-types";
import Label from "../atoms/Label";

const AnimatedInputLabel = ({ inputId, isError, disable, labelTitle }) => {
  return (
    <div className="relative">
      <input
        type="text"
        id={inputId}
        className={`block rounded-t-lg pb-2 pt-6 w-full text-sm text-neutral-900 border-0 border-b  appearance-none focus:outline-none focus:ring-0 focus:border-primary-900 peer ${isError ? "border-error-100" : "border-neutral-300"} ${disable && "opacity-40 pointer-events-none"}`}
        placeholder=" "
      />
      <Label
        labelFor={inputId}
        className="absolute text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        children={labelTitle}
      />
    </div>
  );
};

export default AnimatedInputLabel;
AnimatedInputLabel.propTypes = {
  inputId: PropTypes.string,
  labelTitle: PropTypes.string,
  isError: PropTypes.bool,
  disable: PropTypes.bool,
};
