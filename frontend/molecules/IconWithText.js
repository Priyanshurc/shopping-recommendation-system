import PropTypes from "prop-types";
import Avatar from "../atoms/Avatar";
import IcomoonIcon from "../atoms/IcomoonIcon";
import Text from "../atoms/Text";

const IconWithText = ({
    isIcon,
    label,
    textClass,
    type,
    isClickable,
    iconClass,
    icon,
    iconColor,
    iconSize,
    onClickHandler,
    isAvatar,
    avatar,
    avatarSize,
    aligntIconText,
    textVariant,
    alignTextWithIcon,
    iconContainerWidth,
    iconContainerHeight,
    ...property
}) => {
    const textType = {
        default: "default",
        purple: "purple",
        blue: "blue",
        green: "green",
        red: "red",
    };

    const textStyle = {
        default: "",
        purple: "text-primary-900",
        blue: "text-blue-100",
        green: "text-success-100",
        red: "text-error-100",
    };
    return (
        <div className={`${isIcon || isAvatar ? `flex ${aligntIconText || "space-x-2"} ${alignTextWithIcon || "items-center"} ` : ""} ${property.className}`}>
            {isIcon && (
                <div className={`relative flex justify-center items-center flex-shrink-0 ${iconContainerWidth} ${iconContainerHeight}`}>
                    <IcomoonIcon icon={icon} size={iconSize} color={iconColor} className={`${iconClass} flex-shrink-0`} />
                </div>
            )}
            {isAvatar && <Avatar size={avatarSize} imgSrc={avatar} border="border-none" />}
            <Text
                variant={`${textVariant || "bodySmall"}`}
                type={textType[type]}
                className={`${textClass} w-fit ${textStyle[type]} ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                onClick={onClickHandler}
                fontWeight=""
            >
                {label}
            </Text>
        </div>
    );
};

export default IconWithText;

IconWithText.propTypes = {
    className: PropTypes.string,
    isIcon: PropTypes.bool,
    label: PropTypes.string,
    textClass: PropTypes.string,
    type: PropTypes.string,
    isClickable: PropTypes.bool,
    iconClass: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.string,
    onClickHandler: PropTypes.func,
    isAvatar: PropTypes.bool,
    avatar: PropTypes.string,
    avatarSize: PropTypes.string,
};
