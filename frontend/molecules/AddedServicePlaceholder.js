import IcomoonIcon from "../atoms/IcomoonIcon";
import Text from "../atoms/Text";

const AddedServicePlaceholder = ({ serviceName, handleDeleteAddedService, isActive, ...property }) => {
    return (
        <div className={`p-4 pl-0 bg-neutral-100 w-full flex items-center justify-between ${property.className}`}>
            <Text variant="bodySmall" className="text-neutral-900">
                {serviceName}
            </Text>
            <div className="w-4 h-4 flex justify-center items-center cursor-pointer flex-shrink-0" onClick={handleDeleteAddedService}>
                <IcomoonIcon icon={"close-b"} color={"#2A3042"} size={"100%"} />
            </div>
        </div>
    );
};

export default AddedServicePlaceholder;
