import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";

const LinkButton = ({
  variant = "body",
  fontSize = "",
  fontWeight = "",
  children,
  href,
  onClick,
  ...property
}) => {
  const LinkType = {
    body: "body",
    bodySmall: "bodySmall",
    caption: "caption",
  };

  const LinkStyle = {
    body: "text-base",
    bodySmall: "text-sm",
    caption: "text-xs",
  };
  
  return (
    <span
      variant={LinkType[variant]}
      onClick={onClick}
      className={`underline hover:no-underline text-primary-900 ${LinkStyle[variant]} ${fontSize} ${fontWeight} ${property.className}`}
    >
      <Link href={href}>{children}</Link>
    </span>
  );
};

export default LinkButton;

LinkButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.string,
  fontSize: PropTypes.string,
  href: PropTypes.string,
  fontWeight: PropTypes.string,
};
