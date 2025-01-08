import IcomoonIcon from "../atoms/IcomoonIcon";
import InputBox from "../atoms/InputBox";
import Spinner from "../atoms/Spinner";
import Text from "../atoms/Text";

const InputWithCustomButton = ({
    type,
    placeholder,
    inputClassname,
    isLabel,
    label,
    isHelpText,
    helpText,
    helpLink,
    helpLinkHandler,
    errorMessage,
    isError,
    handleSubmit,
    onChange,
    value,
    isWaitingForRcResponse,
    handleLogin,
    ...property
}) => (
    <div className={`${property.className}`}>
        {isLabel && (
            <Text variant="body" fontWeight="font-semibold" className="text-neutral-900 mb-3">
                {label}
            </Text>
        )}
        <div className="w-full flex lg:space-x-4 relative">
            <div className={`w-[98%] ${isWaitingForRcResponse ? "pointer-events-none" : "cursor-pointer"}`}>
                <InputBox
                    type={type}
                    placeholder={placeholder}
                    variant="Large"
                    className={`${inputClassname}`}
                    isError={isError}
                    errorMessage={errorMessage}
                    onChange={onChange}
                    value={value}
                />
            </div>
{/* 
            <div
                onClick={() => {
                    handleLogin({ actionToPerform: handleSubmit });
                }}
                className={`flex-shrink-0 ${isWaitingForRcResponse ? "pointer-events-none bg-neutral-400" : "cursor-pointer bg-secondary-900"
                    } hidden lg:flex items-center cursor-pointer justify-center rounded lg:h-[2.938rem] lg:py-4 lg:px-8 hover:bg-secondary-800 transform transition-transform active:scale-90 duration-300`}
            >
                <Text variant="caption" className="text-white uppercase" fontWeight="font-extrabold ">
                    Check price
                </Text>
            </div> */}
            <div
                onClick={handleSubmit}
                className={` ${isWaitingForRcResponse ? "pointer-events-none bg-neutral-400" : "cursor-pointer bg-secondary-900"
                    } h-[47px] w-[47px] absolute right-0 flex-shrink-0 rounded flex transform transition-transform active:scale-110 duration-300 items-center justify-center`}
            >
                {isWaitingForRcResponse ? (
                    <div className="bg-white rounded bg-opacity-70 h-full w-full absolute top-0 z-50 flex items-center justify-center">
                        <Spinner width="w-6" height="h-6" fill="fill-secondary-900" />
                    </div>
                ) : (
                    <IcomoonIcon icon={"angle-left"} color={"#FCFCFC"} size={"20"} className="-rotate-180" />
                )}
            </div>
        </div>
        {isHelpText && (
            <Text variant="caption" className="text-white mt-3 lg:mt-6">
                {helpText}{" "}
                <span className={`font-bold cursor-pointer ${isWaitingForRcResponse ? "pointer-events-none" : "cursor-pointer"}`} onClick={helpLinkHandler}>
                    {helpLink}
                </span>
            </Text>
        )}
    </div>
);

export default InputWithCustomButton;
