import SectionHeader from "../../atoms/zenovo-sass/SectionHeader";
import React, { useRef, useState } from "react";
import Modal from "./Modal";
import Button from "../../atoms/zenovo-sass/Button";
import SelectBox from "../../atoms/zenovo-sass/Select";
import InputBox from "../../atoms/zenovo-sass/InputBox";
import { AdvanceSearch, Cross } from "../../assets/Icons";

const AdvanceSearchBox = ({
  title,
  tagColorClass,
  show,
  variableOptions = [],
  operatorOptions = [],
  searchOptionList,
  onSearch,
}) => {
  const defaultSearchData = {
    variable: variableOptions.length ? variableOptions[0] : null,
    operator: operatorOptions.length ? operatorOptions[0] : null,
    value: "",
  };
  searchOptionList = [defaultSearchData];
  const [showSearch, setShowSearch] = useState(show || false);
  const [search, setSearch] = useState(searchOptionList);

  const removeSearchItem = (index) => {
    setSearch((state) => [...state.slice(0, index), ...state.slice(index + 1)]);
  };

  const handleChange = (index, key, value) => {
    setSearch((prevState) => {
      const updatedSearch = [...prevState];
      updatedSearch[index] = {
        ...updatedSearch[index],
        [key]: value,
      };
      return updatedSearch;
    });
  };

  const containerRef = useRef(null);

  return (
    <>
      <button type="button" className="" onClick={() => setShowSearch(true)}>
        <AdvanceSearch size={16} />
      </button>
      <Modal
        show={showSearch}
        onClose={() => {
          setShowSearch(false);
        }}
        modalWrapperClass="flex justify-center items-center"
        modalContainerClass="w-[800px] max-w-[90vw] p-1 mx-auto"
      >
        <div className="rounded-lg  bg-neutral-0 font-inter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 p-3">
            <SectionHeader title={title} tagColorClass={tagColorClass} />
          </div>
          <div
            className="mt-4 md:px-3 max-h-[calc(100vh-280px)] overflow-x-hidden overflow-y-auto scroll-smooth"
            ref={containerRef}
          >
            {search.map((option, index) => {
              return (
                <div
                  key={index}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,32px] gap-2 md:gap-4 mb-4 last-of-type:mb-0 md:mb-4 
                  bg-neutral-2 md:bg-transparent p-2 pt-3 md:p-0 rounded-[12px]"
                >
                  <SelectBox
                    options={variableOptions}
                    name={"variableOption"}
                    label={"Variable"}
                    value={option.variable}
                    onChange={(e) => handleChange(index, "variable", e)}
                    horizontalOnMobile={true}
                  />
                  <SelectBox
                    options={operatorOptions}
                    name={"operatorOption"}
                    label={"Operator"}
                    value={option.operator}
                    onChange={(e) => handleChange(index, "operator", e)}
                    horizontalOnMobile={true}
                  />
                  <InputBox
                    name={"searchValue"}
                    label={"Value"}
                    type={"text"}
                    value={option.value}
                    horizontalOnMobile={true}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    disabled={search.length <= 1}
                    className={`flex items-center justify-center transition md:mt-[2.8rem] md:w-6 bg-neutral-0 rounded-[6px] md:bg-transparent w-full  h-8 md:h-6 ${
                      search.length <= 1
                        ? "text-neutral-4 cursor-not-allowed hidden"
                        : "hover:rotate-0 md:hover:rotate-90"
                    }`}
                    onClick={() => removeSearchItem(index)}
                  >
                    <span className="inline-block md:hidden text-[13px]">
                      Delete
                    </span>
                    <span className="md:inline-block hidden">
                      <Cross />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end mt-4 md:mt-2 md:px-3 md:pb-12">
            <Button
              primary={false}
              label="Add More Row"
              onClick={() => {
                setSearch((state) => [...state, defaultSearchData]);
                setTimeout(() => {
                  const scrollableDiv = containerRef.current;
                  scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
                }, 50);
              }}
              className="w-full md:w-auto flex justify-center"
            />
          </div>

          <div className="flex justify-end mt-4 md:px-3 pb-2 gap-4">
            <Button
              primary={false}
              label="Cancel"
              onClick={() => {
                setShowSearch(false);
              }}
            />
            <Button
              primary={true}
              label="Search"
              onClick={() => {
                onSearch(search);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdvanceSearchBox;
