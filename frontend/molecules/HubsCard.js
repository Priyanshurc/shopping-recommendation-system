import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import Heading from '../atoms/Heading';
import IcomoonIcon from '../atoms/IcomoonIcon';
import Text from '../atoms/Text';
import OptionsPopup from './OptionsPopup';

const HubsCard = ({
  dialogRef,
  popupItems,
  optionsPopup,
  selectedVirtualKitItem,
  handlePopup,
  row,
  ...property
}) => {

  const Map = useMemo(() => dynamic(
    () => import('organisms/Map'),
    {
      loading: () => <p>Map is loading!</p>,
      ssr: false
    }
  ), [])
  const coords = row?.boundaries?.coordinates?.[0]?.[0]
  return (
    <div
      className={`border relative border-neutral-300 w-[full] rounded-lg ${property.className}`}
    >
      <div className="h-[11.625rem] relative w-full border-b border-neutral-300">
        <Map position={[coords[1], coords[0]]} zoom={13} hubs={[row]} />
      </div>

      <div className="px-4 pb-6 pt-2">
        <div className="flex items-center justify-between">
          <Heading type="h6" className="font-semibold text-neutral-700">
            {row.name}
          </Heading>

          <div className='relative'>
            {optionsPopup && row.id === selectedVirtualKitItem.id ? (
              <IcomoonIcon
                size={20}
                icon="close-b"
                color={'#495057'}
                className="cursor-pointer"
                onClick={(e) => {
                  handlePopup(e, row);
                }}
              />
            ) : (
              <IcomoonIcon
                size={24}
                icon="dot-Horizontal"
                color={'#495057'}
                className="cursor-pointer rotate-90"
                onClick={(e) => {
                  handlePopup(e, row);
                }}
              />
            )}

            {optionsPopup && row.id === selectedVirtualKitItem.id && (
              <OptionsPopup
                top={'-left-[7.5rem] -top-[1rem]'}
                dialogRef={dialogRef}
                popupItems={popupItems}
              />
            )}
          </div>
        </div>

        <div className='flex items-start flex-wrap mt-1 gap-x-1'>
          {/* <Text variant='caption' className='text-neutral-700'>
            Main Hub
          </Text> */}
          <Text variant='caption' className='text-neutral-500 break-all'>
            ({row?.boundaries?.coordinates?.map(cords => cords)})
          </Text>
        </div>
        {/* TO be developer after roles */}
        {/* <div className='mt-4 flex items-center gap-4 flex-wrap'>
        <Badge label={'dawd'} />
        <Badge label={'dawd'} />
        <Badge label={'dawd'} />
        <Badge label={'dawd'} />
      </div> */}
      </div>
    </div>
  )
};

export default HubsCard;
