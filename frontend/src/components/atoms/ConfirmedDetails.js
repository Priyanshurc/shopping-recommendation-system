import React from "react";
import Text from "atoms/Text";
import Label from "atoms/Label";
import PropTypes from "prop-types";
const ConfirmedDetails = ({ text, label, className = "" }) => {
  
  return (
    <div className={className}>
      {label && (
        <Label
          variant="medium"
          textColor="text-black"
          className="text-opacity-60 mb-2 text-left"
          fontWeight="font-semibold"
        >
          {label}
        </Label>
      )}
      <div className="border-2 border-black rounded-xl bg-secondary-200 text-center p-4">
        <Text variant="body" textColor="text-secondary-900">
          {text}
        </Text>
      </div>
    </div>
  );
};

ConfirmedDetails.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};
export default ConfirmedDetails;
