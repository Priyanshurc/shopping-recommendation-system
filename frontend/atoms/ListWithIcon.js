import React from "react";
import IcomoonIcon from "./IcomoonIcon";
import PropTypes from "prop-types";
const ListWithIcon = ({
  id,
  className = "",
  title,
  icon = "correct",
  classForIcon = "",
  onClick = () => {},
}) => {
  return (
    <ul className={`my-2 ${className}`}>
      <li
        id={id}
        className="flex justify-between items-center text-neutral-400 text-sm"
        onClick={onClick}
      >
        <span>{title}</span>
        <IcomoonIcon
          icon={icon}
          className={`w-[15px] h-[9px] stroke-[#7D7D7D] ${classForIcon}`}
        />
      </li>
    </ul>
  );
};

ListWithIcon.propTypes = {
  id:PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  classForIcon: PropTypes.string,
  onClick: PropTypes.func,
};
export default ListWithIcon;
