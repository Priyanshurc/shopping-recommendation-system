import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import IcomoonIcon from "../atoms/IcomoonIcon";

const SubMenuList = ({ item, }) => {
  const {
    title,
    subTitle,
    url = "",
    iconSrc,
    iconSize = "18",
    iconHeight = "18",
    iconAlt = "icon",
    iconPosition = "left", } = item;
  const [openDropdown, setOpenDropDown] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(!isActive)
    setOpenDropDown(!openDropdown)
  }
  return (
    <li>
      <div className="relative">
        <Link href={url}>
          <div className={`flex px-4 hover:bg-neutral-200 items-center ${iconPosition === "right" ? "flex-row-reverse justify-between" : "flex-row"} ${item.submenu && "pr-8"} ${subTitle ? "py-2" : "py-2.5"} ${isActive && "border-l-2 border-primary-900 md:border-0"}`} onClick={onClick}>

            {iconSrc && <div className={`flex-shrink-0 ${iconPosition === "right" ? "ml-2.5" : "mr-2.5"}`}><IcomoonIcon icon={iconSrc} size={iconSize} /></div>}

            <div className={`pr-3 ${iconSrc && "min-w-[100px]"}`}>
              <div className={`text-sm  ${isActive ? "text-primary-900" : "text-neutral-900"}`}>{title}</div>
              <div className={`text-xs ${isActive ? "text-primary-900" : "text-neutral-400"}`}>{subTitle}</div>
            </div>

          </div>
        </Link>
        {item.submenu && item.submenu.length > 0 && (<span className="absolute top-2/4 -translate-y-1/2 right-4"> <Image src={`/images/icons/angle-${isActive ? "up-b" : "down"}.svg`} width="11" height="6" alt="" /></span>)}
      </div>
      {item.submenu && (
        <ul class={`md:absolute z-10 bg-white md:shadow-[0px_4px_6px_rgba(0,0,0,0.1)] ${!openDropdown && "hidden"} ${isActive && "pl-4 md:pl-0"}`}>
          {item.submenu.map(subitem => (
            <SubMenuList item={subitem} />
          ))}
        </ul>
      )}

    </li>
  );
};

const SubMenu = ({ menuItems }) => {
  return (
    <ul className="md:flex">
      {menuItems.map(item => (
        <SubMenuList item={item}></SubMenuList>
      ))}
    </ul>
  );
};


SubMenu.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  link: PropTypes.string,
  iconSrc: PropTypes.string,
  iconSize: PropTypes.string,
  iconHeight: PropTypes.string,
  iconAlt: PropTypes.string,
  iconPosition: PropTypes.string,
};

export default SubMenu;
