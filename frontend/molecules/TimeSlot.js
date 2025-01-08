import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const TimeSlot = ({
    timeSlot, handleTimeSlot, selectedTime, ...property
}) => {
    const isActive = () => selectedTime?.id === timeSlot?.id;

    const slotType = {
        available: {
            boxType: `${isActive() ? 'bg-primary-50 border-primary-900' : 'bg-white border-neutral-400'}`,
            textType: 'text-neutral-900'
        },
        booked: {
            boxType: 'pointer-events-none bg-white border-neutral-200',
            textType: 'text-neutral-300 '
        }
    };
    return (
        <div onClick={() => handleTimeSlot(timeSlot)} className={`cursor-pointer rounded-md px-5 py-3 w-fit border ${property.className} ${slotType[timeSlot.status].boxType}`}>
            <Text variant="bodySmall" fontWeight="" className={`uppercase ${slotType[timeSlot.status].textType}`}>
                {timeSlot.time}:00 {timeSlot.timeAbbreviation}
            </Text>
        </div>
    );
};

export default TimeSlot;

TimeSlot.propTypes = {
    className: PropTypes.string,
    timeSlot: PropTypes.object,
    handleTimeSlot: PropTypes.func,
    selectedTime: PropTypes.object
};
