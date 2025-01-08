import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import InputBox from '../atoms/InputBox';
import Text from '../atoms/Text';

const CompleteAddressFull = ({
    address,
    handleChangeAddress,
    register,
    errors,
    onNameChange,
    ...property
}) => {
    const [addressHeading, setAddressHeading] = useState('');
    const [addressSubHeading, setAddressSubHeading] = useState('');
    const [changeAddressButtonText, setChangeAddressButtonText] = useState('');

    const setAddressHeader = () => {
        if (address?.line2 && address?.formattedAddress) {
            const addressPart1 = address.line2;
            const addressPart2 = address.formattedAddress.replace(
                `${address.line2}, `,
                ''
            );

            setAddressHeading(addressPart1);
            setAddressSubHeading(addressPart2);
            setChangeAddressButtonText('Change');
        } else {
            setChangeAddressButtonText('Select');
        }
    };

    useEffect(() => {
        setAddressHeader();
    }, [address]);

    return (
        <div className={`w-full p-4 bg-white ${property.className}`}>
            <div className="flex flex-col items-start justify-between pb-4 border-b border-neutral-200">
                <Text variant="" className="text-neutral-500 mb-3 text-[0.625] italic">
        *We only service in Gurgaon
                </Text>
                <div className='flex justify-between w-full items-start gap-x-10'>

                    <div className="gap-y-2 flex flex-col">
                        <Text
                            variant="bodySmall"
                            fontWeight="font-semibold"
                            className="text-neutral-900"
                        >
                            {addressHeading}
                        </Text>
                        <Text variant="caption" className="text-neutral-600">
                            {addressSubHeading}
                        </Text>
                    </div>
                    {changeAddressButtonText && (
                        <Button
                            id={'change-gps-location-btn'}
                            style="ghost"
                            label={changeAddressButtonText}
                            className="py-2 px-5 font-semibold"
                            onClick={handleChangeAddress}
                        />
                    )}
                </div>
            </div>
            <div className="mt-4">
                <form action="" className="flex flex-col gap-y-4">
                    <InputBox
                        isLabel
                        id="name"
                        name="name"
                        type="text"
                        labelText="Your name *"
                        labelClass="font-semibold text-sm"
                        placeholder="Enter name"
                        variant="Large"
                        {...register('name')}
                        isError={!!errors?.name?.message}
                        onChange={(e) => {
                            onNameChange(e.target.value);
                        }}
                        errorMessage={errors?.name?.message}
                    />
                    <InputBox
                        isLabel
                        id="line1"
                        name="line1"
                        type="text"
                        labelText="Complete Address *"
                        labelClass="font-semibold text-sm"
                        placeholder="Enter Complete Address"
                        variant="Large"
                        {...register('line1')}
                    />
                    <InputBox
                        isLabel
                        id="landmark"
                        name="landmark"
                        type="text"
                        labelText="Landmark"
                        labelClass="font-semibold text-sm"
                        placeholder="e.g Behind post office"
                        variant="Large"
                        {...register('landmark')}
                    />
                    <InputBox
                        isLabel
                        id="pincode"
                        name="pincode"
                        type="number"
                        labelText="Pincode"
                        labelClass="font-semibold text-sm"
                        placeholder="Enter pincode"
                        variant="Large"
                        {...register('pincode')}
                        isError={!!errors?.pincode?.message}
                        inputMode="numeric"
                        errorMessage={errors?.pincode?.message}
                    />
                </form>
            </div>
        </div>
    );
};

export default CompleteAddressFull;

CompleteAddressFull.propTypes = {
    className: PropTypes.string,
    address: PropTypes.object,
    handleCompleteAddress: PropTypes.func
};
