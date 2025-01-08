import React, { useState, useEffect } from 'react';
import Checkbox from "atoms/zenovo-sass/Checkbox";
import { Tick, Cross, CheckmarkList, SecurityShield,Bluetooth_drive, ChildSeat, AdditionalDriver, Refueling, CrossBorderDriving, DeliveryCollection, DefaultIconAddOn } from "../assets/Icons";
import Text from "atoms/Text";
import Button from "atoms/zenovo-sass/Button";
import SearchBox from "./zenovo-sass/SearchBox";
import { formatCurrency } from 'helpers/utilities';

function ViewVehicleAddons({
    data = [],
    selected,
    onSelectionChange,
    allowSingleRowSeclection,
    isShowAddonsFilter = false,
    hideCheckboxOption = false
}) {
  const [selectedItems, setSelectedItems] = useState(selected);
  console.log("package selection change", selected)
  console.log("addons data", data)

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  return (
    <div>
          {/* <div className="flex mt-4 justify-between items-center bg-white shadow-lg p-4 rounded-lg">
            {true && (
              <div className=" md:block md:w-auto flex ">
                <SearchBox placeholder="Search" />
              </div>
            )}
            { isShowAddonsFilter && <div className="flex gap-2">
              <Button
                type="button"
                label="All"
                primary={false}
                size="small"
                className="activeBtn"
              ></Button>
              <Button
                type="button"
                label="Projection"
                primary={false}
                size="small"
              ></Button>
              <Button
                type="button"
                label="Add-ons"
                primary={false}
                size="small"
              ></Button>
            </div>
            }
          </div> */}

          {data?.map((list,index) => {
            const selected = selectedItems?.filter((item) => item.data_id == list.data_id);
            const isSelected = selected?.length > 0;
            const packageId = isSelected ? selected[0].packageId : null;
            console.log("package selected", selected, packageId)
            return (
              <AddonCard
                key={list.data_id}
                title={list.data_name}
                subtitle={list.data_description}
                totalPrice={list.data_totalPriceAmount}
                currency={list.data_currency}
                data={list}
                isSelected={isSelected}
                onSelectionChange={onSelectionChange}
                index={index}
                packageId={packageId}
                hideCheckboxOption={hideCheckboxOption}
              />
            )
          })}
        </div>
  )
}

export default ViewVehicleAddons;

function AddonCard({
    className,
    icon,
    title,
    subtitle,
    totalPrice = "",
    currency = "AED",
    data,
    isSelected,
    onSelectionChange,
    index,
    packageId = null,
    hideCheckboxOption = false
  }) {
    return (
      <div className="bg-white px-2 py-4 mt-4 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Checkbox
            name={"check"}
            type={"squared"}
            className={`cursor-pointer my-1 ${hideCheckboxOption ? "hidden" : ""}`}
            checked={isSelected}
            register={() => {}}
            onChange={(e) => onSelectionChange(isSelected, data)}
            viewMode={isSelected && packageId ? true : false}
          />
          <div className="flex gap-2">
            {index === 0 ? (
              <Refueling size={24} />
            ) : index === 1 ? (
              <AdditionalDriver size={24} />
            ) : index === 2 ? (
              <ChildSeat size={24}/>
            ) : index === 3 ? (
              <CrossBorderDriving size={24}/>
            ) : index === 4 ? (
              <DeliveryCollection size={24}/>
            ) : index === 5 ? (
              <DeliveryCollection size={24}/>
            ) : (
              <DefaultIconAddOn size={24}/>
            )}
            <div></div>
            <div>
              <Text fontWeight="font-semibold" fontSize="text-[12px]">
                {title}
              </Text>
              <Text fontSize="text-[12px]">{subtitle}</Text>
            </div>
          </div>
        </div>
        <div>
          <Text fontSize="text-[12px]">Price per/day</Text>
          <Text fontWeight="font-semibold" fontSize="text-[12px]">
            {formatCurrency(totalPrice,currency)} {currency}
          </Text>
        </div>
      </div>
    );
  }