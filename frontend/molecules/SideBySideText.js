import React from "react";
import Text from "../atoms/Text";

const SideBySideText = ({
  firstText,
  firstTextClass,
  textVariant,
  secondTextClass,
  secondText,
  middleText,
  middleTextClass,
  ...property
}) => (
  <div className={`flex justify-between items-center ${property.className}`}>
    <Text variant={ textVariant || 'bodySmall'} className={`text-neutral-700 ${firstTextClass}`}>
      {firstText}
    </Text>
    {middleText && (
      <Text
        variant={ textVariant || 'bodySmall'}
        className={`text-neutral-700 ${middleTextClass}`}
      >
        {middleText}
      </Text>
    )}
    <Text variant={ textVariant || 'bodySmall'} className={`text-neutral-700 ${secondTextClass}`}>
      {secondText}
    </Text>
  </div>
);

export default SideBySideText;
