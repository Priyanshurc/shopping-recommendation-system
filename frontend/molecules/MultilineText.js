import React from 'react';
import PropTypes from 'prop-types';
import IcomoonIcon from '../atoms/IcomoonIcon';
import Text from '../atoms/Text';

const MultilineText = ({
    firstLineClass,
    nextLineClass,
    firstLine,
    nextLine,
    thirdLine,
    isIcon,
    icon,
    size,
    color,
    onClick,
    textVariant,
    textColor,
    iconWidth,
    iconHeight,
    ...property
}) => (
    <div
        className={`${isIcon ? 'flex items-center space-x-2' : ''} ${
            property.className
        }`}
    >
        {isIcon && (
            <div className={`${iconWidth} ${iconHeight} relative`}>
                <IcomoonIcon
                    icon={icon}
                    size={'100%'}
                    color={color}
                    onClick={onClick}
                    className="cursor-pointer"
                />
            </div>
        )}
        <div>
            <Text
                variant={`${textVariant || 'bodySmall'}`}
                fontWeight=""
                className={`${textColor || 'text-neutral-600'} ${firstLineClass}`}
            >
                {firstLine}
            </Text>
            <Text
                fontWeight=""
                variant={`${textVariant || 'bodySmall'}`}
                className={`${textColor || 'text-neutral-600'} ${nextLineClass}`}
            >
                {nextLine} <br /> {thirdLine}
            </Text>
        </div>
    </div>
);

export default MultilineText;

MultilineText.propTypes = {
    className: PropTypes.string,
    firstLineClass: PropTypes.string,
    nextLineClass: PropTypes.string,
    firstLine: PropTypes.node,
    nextLine: PropTypes.string,
    thirdLine: PropTypes.string,
    isIcon: PropTypes.bool,
    icon: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
};
