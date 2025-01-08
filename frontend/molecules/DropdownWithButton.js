import Button from 'atoms/Button';
import IcomoonIcon from 'atoms/IcomoonIcon';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';

const DropdownWithButton = ({
    id,
    name,
    placeholder,
    dbName,
    options,
    isDisable,
    isClearable,
    isRequired,
    isSearchable,
    isLabel,
    isError,
    errorMessage = 'Please select a role',
    labelFor,
    labelClassName,
    labelText,
    register,
    control,
    errors,
    width,
    getOptionLabel,
    getOptionValue,
    handleOnChange,
    selectedValue,
    selectClasses,
    menuPosition = 'absolute',
    btnClasses,
    btnLabel,
    btnSize,
    btnStyle,
    isDisabled = false,
    onInputChange,
    noOptionsMessage,
    handleSubmit,
    ...rest
}) => {
    const [value, setValue] = useState('');
    const [click, setClick] = useState(true);
    const [input, setInput] = useState('');
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: state.isDisabled ? '' : '#fcfcfc',
            borderColor: state.isFocused ? '#6F3895' : errors ? '#DC2020' : '#D1D1DB',
            borderWidth: '0.5px',
            minHeight: '2.938rem',
            height: '2.938rem',
            borderRadius: '4px',
            boxShadow: 'none'
        }),

        option: (provided) => ({
            ...provided,
            color: 'black',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: '#F3F3F6'
            }
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '100%',
            padding: '0 12px'
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '0.875rem'
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '100%'
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: state.isFocused ? '#6F3895' : '#D1D1DB'
        })
    };

    // useEffect(() => {
    //     console.log('---selectedValue', selectedValue);
    //     setInput(selectedValue);
    // }, [selectedValue]);

    const handleChange = (e) => {
        handleOnChange(e);
        setValue(e);
    };

    const handleInputOnChange = (e, action) => {
        if (action.action !== 'input-blur' && action.action !== 'menu-close') {
            onInputChange(e);
            setInput(e);
        }
    };

    return (
        <div className="flex flex-row items-center gap-x-2 w-full">
            <div className={`${width}`}>
                {isLabel && (
                    <label
                        htmlFor={labelFor}
                        className={`text-sm text-neutral-800 font-medium  block ${labelClassName}`}
                    >
                        {labelText}
                    </label>
                )}

                <Select
                    menuPosition={menuPosition}
                    className={selectClasses}
                    id={id}
                    name={name}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    options={options}
                    value={value}
                    inputValue={input}
                    onChange={(e) => handleChange(e)}
                    onInputChange={(e, action) => handleInputOnChange(e, action)}
                    noOptionsMessage={(inputValue) => {
                        if (inputValue) {
                            setClick(false);
                            return noOptionsMessage(inputValue);
                        }
                        setClick(true);
                    }}
                    placeholder={placeholder}
                    styles={customStyles}
                    getOptionLabel={(option) => (getOptionLabel.includes('.')
                        ? getOptionLabel.split('.').reduce((o, k) => o && o[k], option)
                        : option[getOptionLabel])
                    }
                    getOptionValue={(option) => (getOptionValue.includes('.')
                        ? getOptionValue.split('.').reduce((o, k) => o && o[k], option)
                        : option[getOptionValue])
                    }
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#6F3895'
                        }
                    })}
                    isDisabled={isDisabled}
                />
                {isError && (
                    <div className="text-red-500 text-sm pt-1 pb-1">{errorMessage}</div>
                )}
            </div>

            <div onClick={handleSubmit} className='w-8 h-8 transform transition-transform active:scale-90 duration-300 lg:hidden flex items-center flex-shrink-0 justify-center rounded bg-primary-900'>
                <IcomoonIcon icon={'save'} color={'#ffff'} size={16} />
            </div>

            <Button
                label={btnLabel}
                style={btnStyle}
                className={btnClasses}
                size={btnSize}
                onClick={() => { handleSubmit(); setInput(''); }}
                disabled={click}
            />
        </div>
    );
};

export default DropdownWithButton;

DropdownWithButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    isError: PropTypes.bool,
    errorClass: PropTypes.string,
    options: PropTypes.array,
    labelFor: PropTypes.string,
    labelClassName: PropTypes.string,
    labelText: PropTypes.string,
    isDisabled: PropTypes.bool,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isMulti: PropTypes.bool,
    errors: PropTypes.object
};
