import React from 'react';
import PropTypes from 'prop-types';
import IcomoonIcon from '../atoms/IcomoonIcon';

const IconWithContainer = ({
    width,
    height,
    icon,
    iconSize,
    iconColor,
    bgColor,
    handleIcon,
    ...property
}) => (
    <div
        onClick={handleIcon}
        className={`${width} ${height} ${bgColor} flex justify-center items-center ${property.className}`}
    >
        <IcomoonIcon icon={icon} size={iconSize} color={iconColor} />
    </div>
);

export default IconWithContainer;

IconWithContainer.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    bgColor: PropTypes.string,
    handleIcon: PropTypes.func
};
