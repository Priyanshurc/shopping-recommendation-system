import { useState } from "react";
import Select from "react-tailwindcss-select";
import PropTypes from "prop-types";
import React from "react";

const Dropdown = ({
    id,
    name,
    placeholder,
    options,
    isDisable,
    isClearable,
    isRequired,
    isSearchable,
    isLabel,
    isError,
    errorMessage,
    labelFor,
    labelClassName,
    labelText,
    ...rest
    }) => {

    const [animal, setAnimal] = useState(null);
    const handleChange = value => { setAnimal(value); };

    return (
        <div className={`w-full`}>
        {labelText ??
        <label htmlFor={labelFor} className={`text-sm text-neutral-700 font-medium leading-5 mb-2 block ${labelClassName}`}>
            {labelText}
        </label>
        }
        <Select
            id={id}
            name={name}
            required={isRequired}
            value={animal}
            onChange={handleChange}
            options={options}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isDisabled={isDisable}
            placeholder={placeholder}
            isMulti={true}
            menuIsOpen={true}
            {...rest}

            classNames={{
                menuButton: ({ isDisabled, isSelected}) => (
                    `appearance-none flex text-sm font-normal rounded transition-all duration-300 focus:outline-none border placeholder:text-neutral-600 h-10
                    ${ isDisabled ? 'bg-neutral-100 text-neutral-300 border-neutral-300'
                     : isSelected ? 'border-neutral-500 text-neutral-600' 
                     : 'text-neutral-600 focus:text-neutral-800 border-neutral-500 focus:border-primary-900 cursor-pointer appearance-none'}`
                ),
                menu: 'absolute z-10 w-full bg-white border rounded mt-1 border border-neutral-600 py-2',
                list: 'p-0',
                searchContainer: 'p-2 pt-0 border-neutral-600 bg-white rounded flex',
                searchBox: 'appearance-none w-full py-2 pl-8 capatilize placeholder:text-neutral-600 text-sm bg-white border text-neutral-600 focus:text-neutral-800 border-neutral-500 focus:border-primary-900 rounded outline-none h-10',
                listItem: ({ isSelected }) => (
                    `px-1.5 py-[10px] block transition duration-200 cursor-pointer select-none truncate bg-white text-sm font-normal 
                    ${ isSelected ? 'text-neutral-600 bg-neutral-100' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'}`
                )
            }}
            
        />

        </div>
    );
};

export default Dropdown;

Dropdown.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isDisable: PropTypes.bool,
    required: PropTypes.bool,
    isError: PropTypes.bool,
    errorClass: PropTypes.string,
    options: PropTypes.array,
    labelFor: PropTypes.string,
    labelClassName: PropTypes.string,
    labelText: PropTypes.string,
  };
