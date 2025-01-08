import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "../atoms/ListItem";
import Image from "next/image";

const ListItemDropDown = ({
  iconSrc = "/images/icons/dots.svg",
  iconWidth = "4",
  iconHeight = "18",
  iconAlt = "dot",
  lists,
  listClass = "",
  itemClass = "",
  width = "min-w-[120px]",
  position = "left-0",
  listIconSrc = "",
  listIconWidth = "18",
  listIconHeight = "18",
  listIconAlt = "icon ",
}) => {
  const [toggleOption, setToggleOption] = useState(false);

  const toggleClick = (e) => {
    e.stopPropagation();
    if (e.target.id === 'modal') {
      setToggleOption(false);
    }
  }

  return (
    <div className="relative inline-block">
      <div className="select-none" onClick={() => setToggleOption(true)}>
        <Image
          className='cursor-pointer'
          src={iconSrc}
          width={iconWidth}
          height={iconHeight}
          alt={iconAlt}
        />

        {toggleOption && <div className="">
          <div className="fixed inset-0 bg-transparent bg-opacity-5 transition-opacity h-full w-full"
            id="modal"
            onClick={toggleClick} />
          <ListItem
            Type="ul"
            lists={lists}
            width={width}
            position={position}
            listClass={listClass}
            itemClass={itemClass}
            listIconSrc={listIconSrc}
            listIconWidth={listIconWidth}
            listIconHeight={listIconHeight}
            listIconAlt={listIconAlt}
          />
        </div>}
      </div>
    </div>
  );
};

ListItemDropDown.propTypes = {
  className: PropTypes.string,
  Type: PropTypes.string,
  listClass: PropTypes.string,
};

export default ListItemDropDown;

