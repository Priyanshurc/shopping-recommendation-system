import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import IcomoonIcon from "./IcomoonIcon";

const Breadcrumb = ({
  defaultClass = "font-normal leading-5 text-neutral-500 capitalize",
  currentClass = "text-black font-normal leading-5 capitalize",
  data = [],
  divider = "primary",
  textSize = "text-base",
}) => {
  if (data.length <= 1) {
    return null;
  }

  const breadcrumbType = {
    primary: "separator",
    secondary: "Arrow-Right",
  };

  return (
    <ul divider={divider} className={`flex flex-wrap space-x-2 ${textSize}`}>
      
        <div className="flex items-center justify-center">
          <IcomoonIcon icon={breadcrumbType[divider]} size={18} />
        </div>
     
      {data.map(({ name, path }, key) =>
        key + 1 === data.length ? (
          <li className={`pointer-events-none ${currentClass}`} key={key}>
            {name}
          </li>
        ) : (
          <li className={`flex space-x-2 ${defaultClass}`}>
            <Link key={key} href={path}>
              {name}
            </Link>

            <div className="flex items-center justify-center">
              <IcomoonIcon icon={breadcrumbType[divider]} size={18} />
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default Breadcrumb;

Breadcrumb.propTypes = {
  defaultClass: PropTypes.string,
  currentClass: PropTypes.string,
  data: PropTypes.array,
  textSize: PropTypes.string,
};
