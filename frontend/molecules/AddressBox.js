import PropTypes from "prop-types";
import Text from "../atoms/Text";
import IconWithText from "./IconWithText";

const AddressBox = ({ address, onClick, ...property }) => (
    <div className={`py-3 flex flex-col gap-y-1 cursor-pointer ${property.className} `} onClick={onClick}>
        <IconWithText
            isIcon
            icon={"location-arrow"}
            iconSize={"16"}
            iconColor={"#6F3895"}
            label={address.main}
            textClass={"text-neutral-900 font-semibold"}
            aligntIconText={"space-x-1"}
            isClickable={true}
        />
        <Text variant="caption" className="text-neutral-500">
            {address.complete}
        </Text>
    </div>
);

export default AddressBox;

AddressBox.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    address: PropTypes.object,
};
