import React, { useState, useEffect } from "react";
import CardSelect from "./CardSelect";
import Heading from "atoms/Heading";
import PropTypes from "prop-types";

const CardSelection = ({
  data,
  className = "",
  handleSelection,
  heading,
  selectedId
}) => {
  const [selected, setSelected] = useState(selectedId);

  const selectionChange = (item) => {
    const isSelected = (selected === item.id);
    if(isSelected){
      setSelected(null);
    }else{
      setSelected(item.id);
    }
    handleSelection(item, !isSelected);
  };

  useEffect(() => {
    setSelected(selectedId);
  }, [selectedId]);

  return (
    <>
      {heading && (
        <Heading
          type="h3"
          fontSize="text-[20px]"
          className="font-inter font-semibold text-neutral-7"
        >
          {heading}
        </Heading>
      )}
      <div
        className={`flex gap-2 md:gap-4 max-md:overflow-x-scroll  ${className}`}
      >
        {data?.map((item, i) => (
          <CardSelect
            key={item.id}
            isSelected={selected === item.id}
            onClick={() => selectionChange(item)}
            className="grow  max-sm:max-w-[280px] max-w-[320px]"
            {...item}
          />
        ))}
      </div>
    </>
  );
};

export default CardSelection;

CardSelection.propTypes = {
    className : PropTypes.string,
    heading : PropTypes.string,
    handleSelection : PropTypes.func,
    data: PropTypes.array,
};
