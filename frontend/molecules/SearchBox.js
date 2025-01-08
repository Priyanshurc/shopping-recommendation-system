import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { AdvanceSearch, Cancel, Search } from "../../assets/Icons";
import AdvanceSearchBox from "./AdvanceSearch";
import { debounce } from "lodash";

const SearchBox = ({
  options,
  placeholder = "Search or type a command",
  onSearch,
  onSearchClear,
  showDropDown = false,
  advanceSearch = false,
  onAdvanceSearch,
  variableOptions,
  operatorOptions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
      filterOptions(value);
    }, 600),
    []
  );

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAdvancedOptions([...advancedOptions, value]);
    } else {
      setAdvancedOptions(advancedOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, advancedOptions);
  };

  const filterOptions = (query) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`inline-flex w-full md:w-auto items-center relative rounded-lg ${
          searchQuery ? "bg-neutral-0" : ""
        }`}
      >
        {searchQuery && showDropDown && (
          <div className="absolute top-0 left-0 w-full bg-neutral-2 rounded-lg  pt-[68px]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2"
                  onClick={() => {
                    setSearchQuery(option.value);
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2">No results</div>
            )}
          </div>
        )}
        <div
          className={`flex w-full relative z-2 rounded-[12px] gap-[8px] p-[2px] px-[4px] pl-4 border-2 items-center transition-all duration-300 ${
            focus
              ? "border-primary-1 bg-neutral-0"
              : "border-transparent bg-neutral-2"
          }`}
        >
          <Search size={20} />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="ml-0 inline-block bg-transparent h-[36px] focus:outline-none pr-6  md:min-w-[440px]"
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          {advanceSearch && (
            <div className="relative bg-neutral-0 text-neutral-7 advanceSearchButtonShadow text-xs p-2 leading-none rounded-lg">
              <AdvanceSearchBox
                title="Advance Search"
                variableOptions={variableOptions}
                operatorOptions={operatorOptions}
                onSearch={onAdvanceSearch}
                show={showAdvanceSearch}
              />
              <div className="absolute bg-white border border-gray-300 rounded-lg py-2 px-4 mt-1 hidden">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <button
              type="reset"
              className={`absolute top-50 ${
                advanceSearch ? "right-10" : "right-3"
              }`}
              onClick={() => {
                setSearchQuery("");
                onSearchClear();
              }}
            >
              <Cancel size={18} />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

SearchBox.defaultProps = {
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  onSearch: (e) => {
    console.log(e);
  },
};

SearchBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
