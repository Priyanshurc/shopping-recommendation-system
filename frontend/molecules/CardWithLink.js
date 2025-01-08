import React from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

const CardWithLink = ({
    title,
    linkText,
    bigText,
    smallBottomText,
    linkClickHandler,
    ...property
}) => (
    <div
        className={`bg-neutral-50 border border-neutral-200 p-4 rounded-lg w-[17rem] ${property.className}`}
    >
        <div className="mb-2 flex justify-between items-center">
            <Text variant="caption" className="text-neutral-800">
                {title}
            </Text>
            {linkText && (
                <Button
                    onClick={linkClickHandler}
                    style="link"
                    label={linkText}
                    className="text-xs hidden lg:flex"
                />
            )}
        </div>
        <div className="flex items-center gap-x-1">
            <Heading type="h4" className="text-neutral-900 font-medium">
                {bigText}
            </Heading>
            <Text variant="caption" className="text-neutral-400">
                {smallBottomText}
            </Text>
        </div>

        {linkText && (
            <Button
                onClick={linkClickHandler}
                style="link"
                label={linkText}
                className="text-xs lg:hidden mt-2"
            />
        )}
    </div>
);

export default CardWithLink;
