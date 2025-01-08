import IconWithText from './IconWithText';

const ChangeBookingDetails = ({
    timeSlot, handleEditLocation, handleEditSlot, location, ...property
}) => (
    <div className={`px-4 lg:px-0 relative ${property.className}`}>
        <div className="flex justify-between relative items-center py-4 border-b border-neutral-200">
            <IconWithText
                isIcon
                icon={'time-circle'}
                iconSize={'100%'}
                iconContainerHeight={'h-[1.125rem]'}
                iconContainerWidth={'w-[1.125rem]'}
                iconColor={'#6B6B80'}
                label={timeSlot}
                textVariant={'caption'}
                textClass={'text-neutral-500'}
            />
            <div className='relative w-[1.125rem] h-[1.125rem]'>
                {/* <IcomoonIcon
                    id={'edit-time-slot-btn'}
                    onClick={handleEditSlot}
                    icon={'edit'}
                    size={'100%'}
                    color={'#6F3895'}
                    className="flex-shrink-0 cursor-pointer"
                /> */}
            </div>
        </div>
        <div className="flex justify-between items-center py-4">
            <div className='w-[calc(100svw-3.75rem)] lg:w-[38.75rem] lg:overflow-hidden h-[1.25rem]'>
                <IconWithText
                    isIcon
                    icon={'location'}
                    iconSize={'100%'}
                    iconContainerHeight={'h-[1.125rem]'}
                    iconContainerWidth={'w-[1.125rem]'}
                    iconColor={'#6B6B80'}
                    label={location}
                    textVariant={'caption'}
                    textClass={'text-neutral-500 truncate'}
                />
            </div>

            <div className='relative w-[1.125rem] h-[1.125rem]'>
                {/* <IcomoonIcon
                    id={'edit-address-btn'}
                    onClick={handleEditLocation}
                    icon={'edit'}
                    size={'100%'}
                    color={'#6F3895'}
                    className="flex-shrink-0 cursor-pointer"
                /> */}
            </div>
        </div>
    </div>
);

export default ChangeBookingDetails;
