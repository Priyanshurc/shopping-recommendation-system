import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const CompleteAddress = ({
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
                <div className='flex justify-between items-start gap-x-10 w-full'>
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
                            size='small'
                            label={changeAddressButtonText}
                            className="py-2 px-5 font-semibold"
                            onClick={handleChangeAddress}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompleteAddress;

CompleteAddress.propTypes = {
    className: PropTypes.string,
    address: PropTypes.object,
    handleCompleteAddress: PropTypes.func
};
