import PropTypes from "prop-types";
import * as R from "ramda";
import { useState } from "react";

const SortingTableHeader = ({ onClick, title, current }) => {
  const [sortingOrder, setSortingOrder] = useState(null);

  const getSortingOrder = (sortingOrder) =>
    R.cond([
      [R.equals("asc"), () => "desc"],
      [R.equals("desc"), () => "asc"],
      [R.T, () => "asc"],
    ])(sortingOrder);

  const handleClick = () => {
    const newSortingOrder = getSortingOrder(sortingOrder);
    onClick(newSortingOrder);
    setSortingOrder(newSortingOrder);
  };

  return (
    <div
      className={`cursor-pointer after:inline-block after:w-4 after:h-5 after:absolute after:ml-2.5 after:top-4.5 after:bg-sort after:bg-no-repeat after:bg-center ${current && sortingOrder === "asc" && "after:bg-ascSort"
        } ${current && sortingOrder === "desc" && "after:bg-dscSort"} `}
      onClick={() => handleClick()}
    >
      {title}
    </div>
  );
};

export default SortingTableHeader;

SortingTableHeader.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};
