import React, { useState } from "react";
import PropTypes from "prop-types";
import Text from "../atoms/Text";

const Tabs = ({ tabContainerStyle = "", tabsClass = "", tabs, defaultTab = tabs[0]?.id, type, onClick, ...property }) => {
    const [showtab, setShowtab] = useState(defaultTab);
    const enableShowTab = (id) => {
        // let tabtoshow = tabs.find((tab) => tab.id === id);
        setShowtab(id);
    };
    return (
        <div
            className={`${type === "verticalFilled" && "flex  flex-row gap-3"}    ${type === "verticalRight" && "flex flex-row gap-3"}  ${
                type === "verticalLeft" && "flex flex-row gap-3"
            } `}
        >
            <ul
                className={`flex ${type === "verticalFilled" && "flex-col w-fit min-w-[130px]"}
        ${type === "verticalRight" && "flex-col w-fit"} 
        ${type === "verticalLeft" && "flex-col w-fit"} 
        flex-row flex-nowrap overflow-x-auto ${property.className}`}
            >
                {tabs.map((tab) => (
                    <li className={tabsClass} onClick={() => enableShowTab(tab.id)}>
                        <a href={tab.href} key={tab.title} className="px-4 md:px-0">
                            <Text
                                variant="bodySmall"
                                fontSize={`${tab.id === showtab ? "font-semibold" : ""}`}
                                className={`transform transition-transform active:scale-95 duration-300 ${type === "horizontalFilled" && "py-4 px-4 md:px-12"}
                       ${type === "verticalFilled" && "py-4 px-6"} 
                       ${type === "verticalRight" && "py-4 px-6 border-r"}
                       ${type === "verticalLeft" && "py-4 px-6 border-l"}
                       ${type === "horizontalDefault" && "px-2 pb-3 border-b-2"}
                       ${type === "horizontalJustified" && "px-12 pb-3 border-b-2"} 
                       ${
                           tab.id === showtab
                               ? `${type === "horizontalFilled" && "bg-primary-900 border-none text-white rounded-lg"} 
                       ${type === "verticalRight" && "border-r-2 border-primary-900 text-neutral-800"}
                       ${type === "verticalLeft" && "border-l-2 border-primary-900 text-neutral-800"} 
                       ${type === "verticalFilled" && "bg-primary-900 text-white"}
                       ${(type === "horizontalDefault" || type === "horizontalJustified") && " text-primary-800 border-primary-900"}
                       font-medium cursor-pointer`
                               : "cursor-pointer text-neutral-500 border-neutral-300"
                       }`}
                            >
                                {tab.title}
                            </Text>
                        </a>
                    </li>
                ))}
            </ul>
            <div className={`${type === "verticalRight" && "py-3"}  ${type === "verticalLeft" && "py-3"}`}>
                {tabs.map((tab) => showtab === tab.id && <div className={`${tabContainerStyle}  fade-in-text`}>{tab.content}</div>)}
            </div>
        </div>
    );
};

export default Tabs;

Tabs.propTypes = {
    className: PropTypes.string,
};
