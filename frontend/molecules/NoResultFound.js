import React from "react";
import PropTypes from "prop-types";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import Image from "next/image";

const NoResultFound = ({
  iconSrc,
  iconWidth,
  iconHeight,
  iconAlt = "",
  heading,
  subHeading,
}) => {
  return (
    <div className="flex items-center h-full">
      <div className="max-w-xs text-center m-auto">
        <div className="mb-2">
          <Image
            src={iconSrc}
            width={iconWidth}
            height={iconHeight}
            alt={iconAlt}
            className="m-auto"
          />
        </div>
        <Text variant="bodySmall" className="mb-2" fontWeight="font-medium" textColor="text-neutral-600" children={heading} />
        <Text variant="caption" textColor="text-neutral-500" children={subHeading} />
      </div>
    </div>
  );
};

export default NoResultFound;

NoResultFound.propTypes = {
  iconSrc: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconAlt: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  btnChildren: PropTypes.string,
  onClick: PropTypes.func,
};
