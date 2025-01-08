import React, { useState, useEffect } from "react";
import CardSelect from "./CardSelect";
import Heading from "atoms/Heading";
import PropTypes from "prop-types";
import Text from "atoms/Text";
import CardUpsell from "./CardUpsell";
import Button from "atoms/zenovo-sass/Button";
import SearchBox from "./zenovo-sass/SearchBox";
import Checkbox from "atoms/zenovo-sass/Checkbox";
import { Tick, Cross, CheckmarkList, SecurityShield } from "../assets/Icons";
import CardVehicle from "./CardVehicle";
import AccordianExpand from "./AccordianExpand";
import ViewVehicleAddons from "./ViewVehicleAddons";
import { VehicleCurrentUsageStatuses, AddonProductTypes } from "helpers/enums";

const PackageSelection = ({
  isVehicleCategory = true,
  vehicleData,
  className = "",
  handleSelection,
  heading,
  selectedCard,
  onCardSelectionChange,
  isShowSelected,
  initialPackages = [],
  initialProtections = [],
  initialAddons = [],
  onCancel,
  onConfirm,
  packagesData,
  protectionData = [],
  addOnData = [],
  isShowVehicleTag = false,
  isShowVehiclePriceDifferenceOnly = false,
  isShowDiscount = false,
  vehicleCategoryId
}) => {
  // const [selectedVehicle, setSelectedVehicle] = useState(selectedCard?.[0]);
  const [selectedPackages, setSelectedPackages] = useState(initialPackages || []);
  const [selectedAddons, setSelectedAddons] = useState(initialPackages?.[0]?.includedAddonPriceCodes || []);
  const [selectedProtections, setSelectedProtections] = useState(initialPackages?.[0]?.includedProtectionPriceCodes || []);
  console.log("vehicleCategorySelection", vehicleCategoryId)

  const [isAddonAccordianExpanded, setIsAddonAccordianExpanded] = useState(true);

  const [protectionsList, setProtectionsList] = useState(initialPackages?.[0]?.includedProtectionPriceCodes || []);
  const [addonsList, setAddonsList] = useState(initialPackages?.[0]?.includedAddonPriceCodes || []);

  //Package selection change
  //Remove all addons from the selected addons list which are not part of selected packages
  //Add the package addons to the selected addons list
  const upsellSelectionChange = (item) => {
    const selectedPackages = selectedPackages?.filter((upsell) => upsell.packageId === item.packageId);
    const isSelected = selectedPackages?.length > 0;
    const selectedPackageId = isSelected ? selectedPackages[0]?.packageId : null;
    console.log("package selection change", isSelected, item)
    let currentlySelectedAddons = selectedAddons;
    let currentlySelectedProtections = selectedProtections;
    if (isSelected) {
      setSelectedPackages([]);
      currentlySelectedAddons = removeAllPackageItemsFromBooking(AddonProductTypes.EXTRAS, selectedAddons);
      currentlySelectedProtections = removeAllPackageItemsFromBooking(AddonProductTypes.PROTECTION, selectedProtections);
    } else {
      // If more than one package can be selected, iterate over packages
      setSelectedPackages([item]);
      currentlySelectedAddons = removeAllPackageItemsFromBooking(AddonProductTypes.EXTRAS, selectedAddons);
      currentlySelectedAddons = addPackageItemsToBooking(AddonProductTypes.EXTRAS, currentlySelectedAddons, item.packageId, item?.includedAddonPriceCodes);
      currentlySelectedProtections = removeAllPackageItemsFromBooking(AddonProductTypes.PROTECTION, selectedProtections);
      currentlySelectedProtections = addPackageItemsToBooking(AddonProductTypes.PROTECTION, currentlySelectedProtections, item.packageId, item?.includedProtectionPriceCodes);
      setIsAddonAccordianExpanded(true);
    }

    setAddonsList(currentlySelectedAddons);
    setProtectionsList(currentlySelectedProtections);

    setSelectedAddons(currentlySelectedAddons);
    setSelectedProtections(currentlySelectedProtections);
  };

  const removeSelection = (list, itemToRemove, removePackageItems = false) => {
    return list?.filter((item) => 
      (item.data_id !== itemToRemove.data_id) && (!removePackageItems || item?.packageId)
    );
  }

  const addSelection = (list, item) => {
    return [...list, item];
  }

  const addPackageItemsToBooking = (type, currentBookingSelection, packageId, packageItems) => {
    let selected = [];
    if(currentBookingSelection) {
      selected = currentBookingSelection?.filter((item) => item?.packageId !== packageId);
    }
    selected = [
      ...selected, 
      ...packageItems
    ];

    // if(type == AddonProductTypes.EXTRAS) {
    //   setSelectedAddons(selected);
    // } else if(type == AddonProductTypes.PROTECTION) {
    //   setSelectedProtections(selected);
    // }
    return selected;
  }

  const removePackageItemsFromBooking = (type, currentBookingSelection, packageId) => {
    let selected = [];
    console.log("currentBookingSelection", currentBookingSelection)
    if(currentBookingSelection) {
      selected = currentBookingSelection?.filter((item) => item?.packageId !== packageId);
    }
    if(type == AddonProductTypes.EXTRAS) {
      setSelectedAddons(selected);
    } else if(type == AddonProductTypes.PROTECTION) {
      setSelectedProtections(selected);
    }
    return selected;
  }

  const removeAllPackageItemsFromBooking = (type, currentBookingSelection) => {
    let selected = [];
    if(currentBookingSelection) {
      selected = currentBookingSelection?.filter((item) => !item?.packageId);
    }
    // if(type == AddonProductTypes.EXTRAS) {
    //   setSelectedAddons((prev) => selected);
    // } else if(type == AddonProductTypes.PROTECTION) {
    //   setSelectedProtections((prev) => selected);
    // }
    return selected;
  }

  const getPackageItemsByType = (packageItems, type) => {
    let items = [];
    console.log("package selection change", packageItems, type)
    if(packageItems) {
      items = packageItems?.filter((item) => item?.data_typeId == type)
    }
    console.log("package selection change", items)
    return items;
  }


  const addonsSelectionChange = (currentlySelected, item) => {
    console.log("currentlySelected", currentlySelected, item)
    if (currentlySelected) {
      if(item?.data_typeId == AddonProductTypes.EXTRAS) {
        setSelectedAddons(removeSelection(selectedAddons, item));
      } else if(item?.data_typeId == AddonProductTypes.PROTECTION) {
        setSelectedProtections(removeSelection(selectedProtections, item));
      }
    } else {
      if(item?.data_typeId == AddonProductTypes.EXTRAS) {
      const isSelected = selectedAddons?.some((addon) => addon.data_id === item.data_id);
      if(!isSelected) {
          setSelectedAddons(addSelection(selectedAddons, item));
        }
      } else if(item?.data_typeId == AddonProductTypes.PROTECTION) {
        const isSelected = selectedProtections?.some((addon) => addon.data_id === item.data_id);
        if(!isSelected) {
          setSelectedProtections(addSelection(selectedProtections, item));
        }
      }
    }
  };

  //selection change for vehicle
  //Load respective packages for the vehicle category
  //Currently assume that all addons of the packages are also available in general addons list
  // const selectionChange = (item) => {
  //   const previouslyInSelectedState = selectedVehicle?.data_id === item.data_id;
  //   if (previouslyInSelectedState) {
  //     console.log("selected vehicle1", item)
  //     setSelectedVehicle(null);
  //   } else {
  //     console.log("selected vehicle1", item)
  //     setSelectedVehicle(item);
  //   }
  //   if(!previouslyInSelectedState &&
  //       (!isVehicleCategory ? 
  //         item?.data_vehicleCategoryId == selectedCard?.[0]?.data_vehicleCategoryId : 
  //         item?.data_id == selectedCard?.[0]?.data_id
  //       )
  //   ) {
  //     console.log("selected vehicle", item)
  //     setSelectedPackages(initialPackages);
  //     setSelectedAddons(initialAddons);
  //     setSelectedProtections(initialProtections);
  //     setIsAddonAccordianExpanded(true);
  //   } else {
  //     setSelectedPackages([]);
  //     setSelectedAddons([]);
  //     setSelectedProtections([]);
  //     setIsAddonAccordianExpanded(false);
  //   }
  //   onCardSelectionChange(item);
  // };

  const onConfirmSelection = () => {
    const selected = {
      // vehicle: selectedVehicle,
      packages: selectedPackages,
      addons: selectedAddons,
      protections: selectedProtections
    };
    onConfirm(selected);
  };

  useEffect(() => {
    setSelectedPackages(initialPackages);
    setSelectedAddons(initialPackages?.[0]?.includedAddonPriceCodes || []);
    setSelectedProtections(initialPackages?.[0]?.includedProtectionPriceCodes || []);
  }, [initialPackages]);

    // useEffect(() => {
    //   setSelectedAddons(initialAddons);
    // }, [initialAddons]);

    // useEffect(() => {
    //   setSelectedProtections(initialProtections);
    // }, [initialProtections]);

  const handleCardClick = (index) => {
    setActiveRow(activeRow === index ? null : index);
  };

  return (
    <>
      {heading && (
        <Heading
          type="h3"
          fontSize="text-[20px]"
          className="font-inter font-semibold text-neutral-7 mb-7"
        >
          {heading}
        </Heading>
      )}
      <div className={`w-full flex flex-wrap gap-4 md:gap-7 justify-start ${className}`} >
      <div className="w-full font-inter bg-neutral-3 rounded-lg px-4 pt-8 pb-6 mb-6 mt-6">
        <div
          className={`flex gap-2 md:gap-4 max-md:overflow-x-scroll my-6 ${className}`}
        >
          {packagesData?.
          filter((item) => (!item?.vehicleCategoryId || (item?.vehicleCategoryId == vehicleCategoryId)))?.
          map((item, i) => (
            <CardUpsell
              key={item.id}
              isSelected={selectedPackages?.some((upsell) => upsell.packageId == item.packageId)}
              onClick={() => upsellSelectionChange(item)}
              className="grow  max-sm:max-w-[280px] max-w-[320px]"
              index={i}
              {...item}
            />
          ))}
        </div>
        <div className="border-t-2 mb-4"></div>
        <AccordianExpand
          heading={"Show Individual add-ons"}
          isExpanded={isAddonAccordianExpanded}
        >
          <ViewVehicleAddons 
            data={[...addonsList||[], ...protectionsList||[]]} 
            selected={[...selectedAddons||[], ...selectedProtections||[]]}
            onSelectionChange={(currentSelectionState, item) => addonsSelectionChange(currentSelectionState, item)}
            hideCheckboxOption={true}
          />
        </AccordianExpand>
        </div>
        <div className="border-t-2 mt-4"></div>

        <div className="flex gap-4 justify-end items-center mt-8">
          <Button
            type="button"
            label="Confirm selection"
            size="small"
            primary={false}
            className="bg-transparent border-neutral-4 !rounded"
            state={selectedPackages?.length <= 0 ? "disabled" : ""}
            onClick={onConfirmSelection}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default PackageSelection;

PackageSelection.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  handleSelection: PropTypes.func,
  data: PropTypes.array,
};
