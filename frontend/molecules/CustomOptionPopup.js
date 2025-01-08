
import CustomMenuItems from "../atoms/CustomMenuItems";

const CustomOptionPopup = ({ dialogRef, popupItems, listClass, ...property }) => {
    return (
        <div
            ref={dialogRef}
            className={`-left-28 py-1 -top-[4.5rem] bg-white shadow-md border border-neutral-100 rounded-lg w-fit absolute z-[10] ${property.className}`}
        >
            <CustomMenuItems isIcon iconSize={"20"} menuItem={popupItems}  listClass={listClass} />
        </div>
    );
};

export default CustomOptionPopup;
