import IcomoonIcon from "../atoms/IcomoonIcon";
import Text from "../atoms/Text";

const BookingDetailPlaceholder = ({ label, children, childrenClass, onClick, isEditIsDisabled, ...property }) => {
  return (
    <div className={`w-full flex gap-5 lg:gap-10 items-center py-5 border-b border-neutral-200 ${property.className}`}>
      <Text variant="body" fontWeight="font-semibold" className="text-neutral-700 lg:w-[200px]">
        {label}
      </Text>

      <div className={`flex-1 flex-shrink-0 ${childrenClass}`}>{children}</div>
      {isEditIsDisabled && <div className="w-6 h-6 cursor-pointer flex-shrink-0" onClick={onClick}>
        <IcomoonIcon icon={"edit"} size="100%" color={"#14142B"} />
      </div>}
    </div>
  )
}

export default BookingDetailPlaceholder;
