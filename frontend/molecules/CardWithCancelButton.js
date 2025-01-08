import React from 'react';
import IcomoonIcon from '../atoms/IcomoonIcon';

const CardWithCancelButton = ({
    removeItem, children, childrenWrapperClass, isCloseIcon = true, ...property
}) => (
    <div className={` ${property.className}`}>
        <div className={childrenWrapperClass}>
            {children}
        </div>
        {isCloseIcon
        && <IcomoonIcon
            onClick={removeItem}
            icon={'close-b'}
            size={18}
            className="cursor-pointer"
            color={'#2A3042'}
        />
        }
    </div>
);

export default CardWithCancelButton;
