import Text from '../atoms/Text';

const FuelTypeBadge = ({
    fuelType, active, disable, handleFuelType, textColor, id, ...property
}) => (
    <div
        id={id}
        onClick={handleFuelType}
        className={`px-7 cursor-pointer py-3 border transform transition-transform active:scale-90 
    duration-300 ${disable ? 'bg-neutral-100 text-neutral-400' : ' text-neutral-500'} ${active ? 'bg-primary-50 border-primary-900' : 'bg-white border-neutral-300'}  
    rounded flex items-center justify-center w-fit ${property.className}`}>
        <Text variant="bodySmall" className={` ${textColor || 'text-neutral-900'}`}>
            {fuelType}
        </Text>
    </div>
);

export default FuelTypeBadge;
