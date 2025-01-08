import { getFlagEmoji } from "../../helpers/utilities";
import { ADDRESS_DATA } from "../../assets/addressData";
import InputBox from "../../atoms/zenovo-sass/InputBox";
import SelectBox from "../../atoms/zenovo-sass/Select";
import React, { useEffect, useState } from "react";
import FieldLabel from "atoms/zenovo-sass/FieldLabel";

const countryPrefixOptions = ADDRESS_DATA.data.countries.map((item) => ({
  ...item,
  phoneNumberPrefix: "+" + item.phoneNumberPrefix
}))
  .map((item) => {
    return {
      label:
        "(" +
        item.phoneNumberPrefix +
        ") " +
        getFlagEmoji(item.code) +
        " " +
        item.name,
      value: item.phoneNumberPrefix,
      name: item.name,
      code: item.code,
    };
  });

const PhoneNumberInput = ({
  prefixOptions = countryPrefixOptions,
  prefixValue = countryPrefixOptions[223],
  inputValue = "",
  inputName = "phone",
  prefixName = "phonePrefix",
  prefixOnChange,
  prefixPlaceholder = "",
  inputPlaceholder = "",
  valueOnChange,
  label,
  filterOptions,
  prefixClasses,
  errors,
  control,
  register,
  viewMode,
  formField,
  horizontalOnMobile,
}) => {

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const customFilter = (option, searchText) => {
    const initialsMatch = option?.data?.label
      .split(" ")
      .map((word) => word.charAt(0).toLowerCase())
      .join("")
      .startsWith(searchText.toLowerCase());

    const isValid =
      initialsMatch ||
      String(option?.data?.name)
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(option?.data?.value)
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      String(option?.data?.code)
        .toLowerCase()
        .includes(searchText.toLowerCase());
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };
  const [prefixLocal, setPrefixLocal] = useState();
  let handlePrefixOnchage;
  if (!control) {
    // handlePrefixOnchage = (e) => {
    //   console.log("e", e);
    //   setPrefixLocal(e);
    //   prefixOnChange(e);
    // }
    useEffect(() => {
      console.log("prefix change", prefixValue);
      setPrefixLocal(countryPrefixOptions.find((o) => o.value == prefixValue));
    }, [prefixValue]);
  }
  return (
    <div 
    className={`h-full ${
      horizontalOnMobile
        ? "grid grid-cols-[1fr_2fr] items-center pb-1"
        : "flex flex-col py-2"
    }`}>
      {label && (
        <div className={`${horizontalOnMobile ? "mb-[-14px] pr-3" : ""}`}>
          <FieldLabel label={label} name={name} type={'extra'} className={`${horizontalOnMobile ? "text-right" : ""}`}/>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 gap-y-0">
        <div className={`flex-1 ${prefixClasses && prefixClasses}`}>
          {control && (
            <SelectBox
              name={prefixName}
              options={prefixOptions}
              placeholder={prefixPlaceholder}
              filterOption={filterOptions ? filterOptions : customFilter}
              menuPlacement="auto"
              // menuPortalTarget={isMounted ? document?.querySelector("body") : undefined}
              // defaultValue={undefined}
              viewMode={false}
              readOnly={viewMode}
              horizontalOnMobile={false}
              value={prefixValue}
              errors={errors}
              control={control}
              formField={formField}
              // menuPortalTarget={ document?.querySelector("body")}
            />
          )}
          {!control && (
            <SelectBox
              name={prefixName}
              options={prefixOptions}
              placeholder={prefixPlaceholder}
              filterOption={filterOptions ? filterOptions : customFilter}
              menuPlacement="auto"
              menuPortalTarget={isMounted ? document?.querySelector("body") : undefined}
              // defaultValue={undefined}
              viewMode={viewMode}
              value={prefixLocal}
              onChange={prefixOnChange}
            />
          )}
        </div>
        <div className="flex-1">
          {register ? (
            <InputBox
              name={inputName}
              type={"number"}
              placeholder={inputPlaceholder}
              // onChange={valueOnChange}
              viewMode={false}
              readOnly={viewMode}
              value={inputValue}
              register={register}
              errors={errors}
            />
          ) : (
            <InputBox
              name={inputName}
              type={"number"}
              placeholder={inputPlaceholder}
              onChange={valueOnChange}
              viewMode={viewMode}
              value={inputValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
