import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const moment = require('moment-timezone');

const DateSlot = ({
    slot, handleDateSlot, selectedSlot, ...property
}) => {
    const getDateSlotStatus = () => {
        if (slot?.availableSlots === 0) return 'booked';
        return 'available';
    };

    const isActive = () => moment(selectedSlot?.date).isSame(slot?.date, 'day');

    const slotType = {
        available: {
            boxType: `${isActive() ? 'bg-primary-50 border-primary-900' : 'bg-white border-neutral-400'}`,
            headingType: `${isActive() ? 'text-neutral-700' : 'text-neutral-900'}`,
            subHeadingType: 'font-semibold text-neutral-900'
        },
        booked: {
            boxType: `${isActive() ? 'bg-neutral-300 border-neutral-200' : 'bg-white border-neutral-300'}`,
            headingType: 'text-neutral-400',
            subHeadingType: 'text-neutral-400 font-semibold'
        }
    };

    const serviceStatus = getDateSlotStatus();
    return (
        <div
            onClick={() => handleDateSlot(slot)}
            className={`cursor-pointer rounded h-[54px] w-[52px] flex-shrink-0 border flex flex-col items-center justify-center text-center 
            ${slotType[serviceStatus].boxType}  ${property.className}`}
        >
            <Text variant="bodySmall" className={`${slotType[serviceStatus].headingType}`} fontWeight="">
                {moment(slot?.date).format('ddd')}
            </Text>
            <Text variant="bodySmall" className={`${slotType[serviceStatus].subHeadingType}`} fontWeight="">
                {moment(slot?.date).format('D')}
            </Text>
        </div>
    );
};

export default DateSlot;

DateSlot.propTypes = {
    className: PropTypes.string,
    slot: PropTypes.object,
    handleDateSlot: PropTypes.func,
    selectedSlot: PropTypes.object,
    getDateSlotStatus: PropTypes.func
};
