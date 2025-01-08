import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../atoms/Heading';
import IconWithContainer from './IconWithContainer';

const HeaderWithIcon = ({
    icon, iconSize, iconColor, bgColor, handleIcon, width, height, title, isIcon, ...property
}) => (
    <div className={`bg-white border-b border-neutral-200 px-4 py-5 rounded-tl-3xl rounded-tr-3xl flex items-center space-x-2 ${property.className}`}>
        {isIcon
        && <IconWithContainer
            icon={icon}
            iconSize={iconSize}
            bgColor={bgColor}
            iconColor={iconColor}
            handleIcon={handleIcon}
            width={width}
            height={height}
            className="rounded-full cursor-pointer"
        />
        }
        <Heading type="h6" className="text-neutral-600 font-semibold">
            {title}
        </Heading>
    </div>
);

export default HeaderWithIcon;

HeaderWithIcon.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    bgColor: PropTypes.string,
    handleIcon: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    title: PropTypes.string
};
