import PropTypes from "prop-types";
import Text from './Text';
import Heading from "./Heading";
import NextImage from 'next/image';

const Alert = ({ variant = "info", alertClass = "", text1, msg, text2, text1Color, text2Color, msgTextColor, type = 'type1', iconSrc, className, handleClose = () => { }, handleOnClick = () => { } }) => {
    const alertType = {
        info: "info",
        error: "error",
        success: "success",
        warning: "warning",
        infoLight: "infoLight",
        errorLight: "errorLight",
        successLight: "successLight",
        warningLight: "warningLight",
    };

    const alertStyle = {
        info: "bg-secondary-500",//used
        msg: 'bg-neutral-500 bg-opacity-20 border border-[#b6b6b633]',
        error: "bg-error-100 text-white",
        success: "bg-success-100 text-white",
        warning: "bg-warning-100 text-black",
        infoLight: "bg-info-50 text-info-100",
        errorLight: "bg-error-50 text-error-100",
        successLight: "bg-success-50 text-success-100",
        warningLight: "bg-warning-50 text-warning-100",
    };

    
    return (
        <>
            {
                type === 'type1' && <div variant={alertType[variant]} className={`rounded-[10px] pb-3 pt-[15px] xs:pb-[25px] px-5 md:pt-[32px] md:pb-[28px] md:px-[30px] ${alertStyle[variant]} ${alertClass}`}>
                    <div className="flex justify-between w-full">
                        <div className="md:flex items-center gap-x-8">
                            {text1 && <Text fontSize="text-sm md:text-lg" textColor={text1Color} fontWeight="font-medium" className='uppercase'>{text1}</Text>}
                            {msg && <Heading type='h5' fontSize='text-base md:text-sm xl:text-[24px]' className={`font-light ${msgTextColor} mt-5 md:mt-0 hidden md:block`}>{msg}</Heading>}
                        </div>
                        {text2 && <Text fontSize="text-sm md:text-base xl:text-lg" textColor={text2Color} fontWeight="font-light" className=''>{text2}</Text>}
                    </div>
                    {msg && <Heading type='h5' fontSize='text-base md:text-xl xl:text-[24px]' className={`${msgTextColor} font-light mt-2 xs:mt-5 md:mt-0 block md:hidden flex-none`}>{msg}</Heading>}
                </div>
            }

            {
                type === 'type2' && <div className={`py-2.5 px-5 rounded-[10px] bg-white flex justify-between ${className}`}>
                    <div className="flex items-center gap-x-2.5">
                        <span className="hidden md:flex items-center">
                            <NextImage src={iconSrc} alt='check' width={50} height={50} />
                        </span>
                        <Text variant="bodyLarge" textColor="text-neutral-900" fontSize="text-xl md:text-lg" fontWeight="font-light" className='mt-1'>{msg}</Text>
                    </div>
                    <NextImage src='/images/icons/close-black-2.svg' alt='check' width={26} height={26} style={{ cursor: 'pointer' }} onClick={handleClose} />
                </div>
            }

            {
                type === 'type3' && <div variant={alertType[variant]} className={`rounded-[10px] px-5 py-[15px] md:p-[30px] md:flex items-center justify-between ${alertStyle[variant]} ${alertClass}`}>
                    <div className="flex">
                        {msg && <Heading type='h5' fontSize='text-base xl:text-lg' className={`${msgTextColor} font-medium flex-none md:mt-0.5`}>{msg}</Heading>}
                        <Text fontSize="text-sm md:text-base lg:text-2xl" className='ml-[18px] hidden md:block' fontWeight="font-light" textColor={text1Color}>{text1}</Text>
                    </div>

                    <div className='hidden md:flex gap-x-2 items-center cursor-pointer' onClick={handleOnClick}>
                        {text2 && <Text fontSize="text-sm md:text-base xl:text-lg" textColor={text2Color} className='' fontWeight="font-light">{text2}</Text>}
                        <span className="relative w-[14px] h-[14px] xs:w-4 xs:h-4 md:w-[18px] md:h-[18px] transform -rotate-90">
                            <NextImage src='/images/icons/angel-down-white.svg' layout="fill" alt="arrow" />
                        </span>
                    </div>

                    <div className="flex justify-between items-center mt-3 xs:mt-5 md:mt-0 md:hidden" onClick={handleOnClick}>
                        {text1 && <Text fontSize="text-sm lg:text-2xl" textColor={text1Color} fontWeight="font-light">{text1}</Text>}
                        <span className="relative w-[14px] h-[14px] xs:w-4 xs:h-4 transform -rotate-90">
                            <NextImage src='/images/icons/angel-down-white.svg' layout="fill" alt="arrow" />
                        </span>
                    </div>
                </div>
            }
        </>


    );
};
export default Alert;

Alert.propTypes = {
    variant: PropTypes.string,
    alertClass: PropTypes.string,
    children: PropTypes.string,
};
