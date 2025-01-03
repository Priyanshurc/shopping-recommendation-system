import IcomoonIcon from "atoms/IcomoonIcon";
import Text from "atoms/Text";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday
} from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DatePicker({
  name,
  getDate = () => { },
  minimumAvailabilityDays = 1,
  selectedDate,
  isError = false,
  errorMessage = "",
  showDatePicker = false,
  setShowDatePicker = () => { },
  showDateContainer = false,
  disablePreviousDate = false,
  disableFutureDate = false
}) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [yourDate, setYourDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }


  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // To show  your selected date
  const handleDate = (e, day) => {
    e.stopPropagation()
    setShowDatePicker(false);
    setSelectedDay(day);
    setYourDate(format(day, "MM/dd/yyyy"));
    getDate(day);
  };

  const handleClickOutside = () => {
    setShowDatePicker(false);
  };

  const isBeforeToday = (date) => date < startOfToday();
  
  const isAfterToday = (date) => date > startOfToday();

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  const isWithinNext7Days = (date) => {
    const oneWeekFromToday = add(today, { days: minimumAvailabilityDays - 1 });
    return date >= today && date <= oneWeekFromToday;
  };

  const disabledButton = (e, date) => {
    e.stopPropagation();
    return isBeforeToday(date) || isWithinNext7Days(date)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const selectedDay = new Date(selectedDate).setHours(0, 0, 0, 0);
      setSelectedDay(selectedDay);
      setYourDate(format(selectedDay, "MM/dd/yyyy"));
      setCurrentMonth(format(selectedDay, "MMM-yyyy"));
    }
  }, [selectedDate])

  const disableFutureButton = (e, date) => {
    e.stopPropagation();
    return isAfterToday(date)
}

  return (
    <div className={`relative`}>
      <div
        className={`border ${showDateContainer ? 'block' : 'hidden'} ${isError ? "border-error-100 border-r-8" : "border-neutral-450"}  rounded py-2.5 px-3 cursor-pointer flex items-center relative`}
        onClick={(e) => {
          e.stopPropagation();
          setShowDatePicker(!showDatePicker);
        }}
        id='date-picker'
      >
        <Image
          src="/images/icons/calender.svg"
          alt="calender"
          width={32}
          height={32}
        />
        <Text
          variant="bodySmall"
          textColor={
            yourDate ? "text-black" : "text-secondary-250 text-opacity-70"
          }
          className="ml-6"
        >
          {yourDate ? yourDate : "Choose another day"}
        </Text>
        <div
          className={`absolute right-[14px] transform duration-300 flex items-center ${showDatePicker ? "rotate-180" : "rotate-0"
            }`}
        >
          <Image
            src="/images/icons/arrow-down.svg"
            alt="arrow down"
            width={16}
            height={16}
          />
        </div>
      </div>
      {errorMessage && <p className="text-error-100 pl-0.5 text-sm pt-2 font-normal leading-[21px] !text-left block">{errorMessage}</p>}
      {showDatePicker && (
        <div className="w-full max-w-[365px] py-3 px-[26px] bg-white absolute left-0 z-40 border border-neutral-450 rounded">
          <div className="flex justify-between items-center border-b border-secondary-450 pb-6">
            <IcomoonIcon
              icon="angle-left"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                previousMonth();
              }}
              id='datepicker-arrow-left'
            />
            <Text
              variant="bodyLarge"
              textColor="text-neutral-550"
              fontWeight="font-semibold"
            >
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </Text>
            <IcomoonIcon
              icon="angle-right"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                nextMonth();
              }}
              id='datepicker-arrow-right'
            />
          </div>
          <div className="grid grid-cols-7 mt-4 text-xs leading-6 text-center text-gray-500">
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              SUN
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              MON
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              TUE
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              WED
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              THU
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              FRI
            </Text>
            <Text variant="xxs" textColor="text-black" fontWeight="font-medium">
              SAT
            </Text>
          </div>

          <div className="grid grid-cols-7 mt-2 text-sm font-medium">
            {days.map((day, dayIdx) => {
              return (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "md:py-1.5"
                  )}
                >
                  <button
                    id={format(day, "d")}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); ((disablePreviousDate && disabledButton(e, day) || disableFutureDate && disableFutureButton(e, day)) ? null : handleDate(e, day)) }} // it will set your selected date
                    className={classNames('pt-1',
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500", // on curreent date
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900", // its show  All date color
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900 hover:bg-gray-200", // if selcted date is not current date then  show color
                      isEqual(day, selectedDate) && "bg-gray-900 hover:bg-gray-200", // if selcted date is not current date then  show color
                      (!isEqual(day, selectedDay) && !isBeforeToday(day)) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                      disablePreviousDate && isBeforeToday(day) && "opacity-50 cursor-not-allowed",
                      disableFutureDate && isAfterToday(day) && "opacity-50 cursor-not-allowed",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                      isWithinNext7Days(day) && "text-red-900 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
