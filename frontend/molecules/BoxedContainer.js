import SectionHeader from "../../atoms/zenovo-sass/SectionHeader";
import React from "react";

const   BoxedContainer = ({
  title,
  header,
  body,
  footer,
  tagColorClass = "bg-secondary-3",
  id,
  className,
  hideTitleTag = true,
  titleClassname = ''
}) => {
  return (
    <div
      className={`rounded-[12px] bg-neutral-1 w-full max-[320px]:p-2 py-4 px-2 md:px-4 ${className && className}`}
      id={id}
    >
      {title ? (
        <div className={`flex sm:flex-row justify-between gap-4 p-4 ${titleClassname}`}>
          <SectionHeader title={title} tagColorClass={tagColorClass} hideTag={hideTitleTag}/>
          {header && header}
        </div>
      ) : (
        <div className="p-3"> {header && header}</div>
      )}

      {body && <div>{body}</div>}
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default BoxedContainer;
