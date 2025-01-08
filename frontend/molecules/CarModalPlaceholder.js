import Text from '../atoms/Text';

const CarModalPlaceholder = ({ model, ...property }) => (
    <div className={`py-2 px-4 cursor-pointer transform transition-transform active:scale-90 duration-300
    border rounded flex items-center justify-center border-neutral-200 bg-white ${property.className}`}>
        <Text variant="bodySmall" className="text-neutral-900">
            {model}
        </Text>
    </div>
);

export default CarModalPlaceholder;
