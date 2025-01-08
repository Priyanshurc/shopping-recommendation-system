import React from 'react';
import PropTypes from 'prop-types';
import IcomoonIcon from '../atoms/IcomoonIcon';
import Text from '../atoms/Text';

const NoSlotsAvailable = ({ ...property }) => (
    <div className={`flex flex-col gap-4 items-center text-center ${property.className}`}>
        <IcomoonIcon icon={'time-slot'} size={'72'} color={'#D1D1DB'} className="flex-shrink-0"/>
        <Text variant='bodySmall' className='text-neutral-400'>
      Sorry, all slots are booked for this date. Please pick an alternative date
      for available slots.
        </Text>
    </div>
);

export default NoSlotsAvailable;

NoSlotsAvailable.propTypes = {
    className: PropTypes.string

};
