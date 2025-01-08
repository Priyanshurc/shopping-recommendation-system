import Image from 'next/image';
import React from 'react';
import Text from '../atoms/Text';

const CarBrandPlaceholder = ({ image, brand, ...property }) => (
    <div className={`px-2 py-1 cursor-pointer flex flex-col items-center gap-y-1 ${property.className}`}>
        <div className='relative h-[68px] aspect-[3/2] w-3/5'>
            <Image src={image} alt='car-brand' layout='fill' />
        </div>
        <Text variant='caption' className='text-neutral-600'>{brand}</Text>
    </div>
);

export default CarBrandPlaceholder;
