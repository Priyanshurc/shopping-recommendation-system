import Text from '../atoms/Text';
import Link from 'next/link';
import IcomoonIcon from '../atoms/IcomoonIcon';
import IconWithText from './IconWithText';
import MultilineText from './MultilineText';

const ServiceStatusPlaceholder = ({
  index,
  serviceStatus,
  isPending,
  serviceDate,
  serviceTime,
  serviceIcon,
  servicelabel,
  isHyperlink,
  linkIcon,
  linkLabel,
  linkHref,
  subText,
  subTextVariant,
  subTextColor,
  subTextAvailable,
  ...property
}) => (
  <div className={`flex items-start space-x-5 mb-3 ${property.className}`}>
    <div className="flex text-right space-x-4  w-1/2 flex-grow justify-end">
      <MultilineText
        firstLine={serviceDate}
        textColor={`${isPending ? 'text-neutral-400' : ' text-neutral-600'}`}
        firstLineClass={'font-semibold !text-xs lg:!text-base'}
        nextLine={serviceTime}
      />
      <IcomoonIcon
        icon={'time-circle'}
        size={'24'}
        className={`${isPending ? 'fill-neutral-400' : ' fill-neutral-600'
          } flex-shrink-0`}
      />
    </div>
    <div className="relative">
      <div
        className={`w-6 h-6 flex items-center justify-center ${isPending ? 'border-2 border-neutral-400' : ' bg-primary-900'
          }`}
      >
        <IcomoonIcon
          icon={'ticksmall'}
          size={'16'}
          className={`${isPending ? 'fill-neutral-400' : ' fill-white'}`}
        />
      </div>
      {index !== serviceStatus.length - 1 && (
        <div className={'h-[65px] w-full mt-3 flex justify-center '}>
          <div
            className={`border-r border-dashed h-full w-[1px] ${isPending ? 'border-neutral-300' : 'border-neutral-400'
              }`}
          ></div>
        </div>
      )}
    </div>

    <div className="flex flex-col gap-y-2  w-1/2 flex-grow ">
      <IconWithText
        textVariant={'body'}
        label={servicelabel}
        isIcon
        icon={serviceIcon}
        iconSize="24"
        iconClass={`${isPending ? 'fill-neutral-400' : ' fill-neutral-600'}`}
        textClass={`${isPending ? 'text-neutral-400' : 'text-neutral-900'
          } font-semibold text-xs lg:text-base`}
        className="text-left"
      />

      {isHyperlink && (
        <Link href={linkHref} passHref target="_blank" rel="noopener noreferrer">
          <a target="_blank">
            <IconWithText
              textVariant={'bodySmall'}
              label={linkLabel}
              isIcon
              icon={linkIcon}
              iconSize="16"
              iconClass={`${isPending ? 'fill-neutral-400' : ' fill-primary-900'
                }`}
              textClass={`${isPending ? 'text-neutral-400' : 'text-primary-900'
                } font-semibold text-xs lg:text-base`}
              className={`text-left pl-8  ${isPending ? 'pointer-events-none' : ''
                }`}
              isClickable
            />
          </a>
        </Link>
      )}
      {subTextAvailable
        && <div className='flex items-center gap-x-1'>
          <Text variant={subTextVariant} className={subTextColor}>{subText}</Text>
        </div>
      }
    </div>
  </div>
);

export default ServiceStatusPlaceholder;
