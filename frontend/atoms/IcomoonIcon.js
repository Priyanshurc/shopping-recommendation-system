import React from 'react';
import PropTypes from 'prop-types';

import IcomoonReact, { iconList } from 'icomoon-react';
import iconSet from '../public/selection.json';

export default function IcomoonIcon({
    color, size, icon, ...property
}) {
    return (
        <IcomoonReact
            iconSet={iconSet}
            color={color}
            size={size}
            icon={icon}
            className={`${property.className}`}
            onClick={property.onClick}
            {...property}
        />
    );
}

IcomoonIcon.propTypes = {
    children: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string
};
