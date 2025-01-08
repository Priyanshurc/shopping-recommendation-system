import React, { useState, createContext } from "react";
import { ADDRESS_DATA } from "../../assets/addressData";
import { getFlagEmoji } from "../../helpers/utilities";
import { ApplePayLogo, GooglePayLogo, UpiLogo } from "../../assets/Icons";

export const StepperContext = createContext();

export const StepperProvider = ({
  children,
  defaultSelectedCountry = "ae",
}) => {
  const [page, setPage] = useState(0);
  const countries = ADDRESS_DATA.data.countries;
  const defaultCountryIndex = countries.findIndex(
    (item) => item.code.toLowerCase() == defaultSelectedCountry
  );
  const [data, setData] = useState({
    pickUpDrop: {
      pickUp: {
        type: "", // If "BRANCH" use locationID object If "ADDRESS" use address object
        locationID: {
          label: "",
          value: "",
        },
        address: {
          address1: "",
          address2: "",

          city: "",
          phone: "",
          postalCode: "",
          zone: {
            label: "",
            value: "",
          },
          country: {
            label: countries[defaultCountryIndex]?.name,
            value:
              countries[defaultCountryIndex]?.code + "$$" + defaultCountryIndex,
          },
          countryCode: defaultSelectedCountry,
          countryIndex: defaultCountryIndex,
          countryPrefix: {
            label:
              getFlagEmoji(countries[defaultCountryIndex].code) +
              " " +
              countries[defaultCountryIndex].phoneNumberPrefix,
            value: countries[defaultCountryIndex].phoneNumberPrefix,
            name: countries[defaultCountryIndex].name,
          },
        },
        date: "",
        time: "",
      },
      drop: {
        type: "", // If "BRANCH" use locationID object If "ADDRESS" use address object
        locationID: {
          label: "",
          value: "",
        },
        address: {
          address1: "",
          address2: "",
          city: "",
          phone: "",
          postalCode: "",
          zone: {
            label: "",
            value: "",
          },
          country: {
            label: countries[defaultCountryIndex].name,
            value:
              countries[defaultCountryIndex].code + "$$" + defaultCountryIndex,
          },
          countryCode: defaultSelectedCountry,
          countryIndex: defaultCountryIndex,
          countryPrefix: {
            label:
              getFlagEmoji(countries[defaultCountryIndex].code) +
              " " +
              countries[defaultCountryIndex].phoneNumberPrefix,
            value: countries[defaultCountryIndex].phoneNumberPrefix,
            name: countries[defaultCountryIndex]?.name,
          },
        },
        date: "",
        time: "",
      },
    },
    vehicleDetail: {},
    protection: {},
    addOns: {},
    customer: [
      {
        email: "",
        phone: "",
        gender: "",
        country: "",
        zone: "",
        phonePrefix: "",
        address: "",
        invoiceAddress: "",
        licenseId: "",
        issuedByCountry: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        issueDate: "",
        expiryData: "",
        undefined: "",
        attachments: [],
      },
    ],
    payment: {
      options: [
        {
          name: "creditCard",
          label: "Credit Card",
          onClick: (e) => {
            console.log("Credit Card", e);
            //setState("LOADING");
          },
        },
        {
          name: "bankTransfer",
          label: "Bank Transfer",
          onClick: (e) => {
            console.log("Bank tranfer", e);
            //setState("SUCCESS");
          },
        },
        {
          name: "upi",
          label: <UpiLogo />,
          onClick: (e) => {
            console.log("UPI", e);
            //setState("INPROGRESS");
          },
        },
        {
          name: "applePay",
          label: <ApplePayLogo className="w-[auto] h-full" />,
          onClick: (e) => {
            console.log("Apple Pay", e);
            ////setState("INITIAL");
          },
        },
        {
          name: "googlePay",
          label: <GooglePayLogo />,
          onClick: (e) => {
            console.log("Google Pay", e);
            //setState("ERROR");
          },
        },
      ],
    },
  });

  const nextPage = () => {
    console.log(data);
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  const gotoPage = (pageNo) => {
    setPage(pageNo);
  };

  const handleChange = (path, value) => {
    setData((prevData) => {
      const keys = path.split(".");
      const newData = { ...prevData };
      let currentObj = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentObj[keys[i]]) {
          currentObj[keys[i]] = {};
        }
        currentObj = currentObj[keys[i]];
      }
      currentObj[keys[keys.length - 1]] = value;

      return newData;
    });
    console.log(data);
  };

  const steps = [
    { title: "Pick Up & Drop" },
    { title: "Vehicle Details" },
    { title: "Protection" },
    { title: "Add Ons" },
    { title: "Customer" },
    { title: "Payments" },
  ];

  return (
    <StepperContext.Provider
      value={{
        page,
        steps,
        nextPage,
        prevPage,
        gotoPage,
        data,
        handleChange,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
