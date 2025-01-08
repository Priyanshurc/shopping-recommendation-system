import MenuList from '../atoms/MenuList';

const OptionsPopup = ({
    dialogRef,
    popupItems,
    params,
    top,
    left,
    right,
    ...property
}) => (
    <div
        ref={dialogRef}
        className={` ${left || '-left-28'} ${right} py-1 ${
            top || '-top-[4.5rem]'
        }  bg-white shadow-md border border-neutral-100 rounded-lg w-fit absolute z-[10] ${
            property.className
        }`}
    >
        <MenuList isIcon iconSize={'20'} menuItem={popupItems} params={params} />
    </div>
);

export default OptionsPopup;
