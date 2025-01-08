import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Checkbox from "../../atoms/zenovo-sass/Checkbox";
import Pagination from "./Pagination";
import RevampedPagination from "./RevampedPagination";

const RevampedTableUI = ({
  data = [],
  value = [],
  initialValue = null,
  enableRowSelection,
  onRowClick,
  onSelectionChange,
  onSelectAll,
  allowSingleRowSeclection,
  enableSorting,
  enableHeaderFilter,
  onHeaderFilterClick = () => { },
  showPagination,
  onPaginationChange,
  pageCount,
  pagination,
  onSortingChange,
  sorting,
  wrapperClass,
  wrapperHeaderClass,
  ...tableProps
}) => {
  const getRowId = React.useCallback((row) => {
    return row?.data_id;
  }, []);
  const rowsSelected = (value) =>
    value?.reduce((obj, r) => ({ ...obj, [getRowId(r)]: true }), {});

  const [rowSelection, setRowSelection] = React.useState([]);

  useEffect(() => {
    if (initialValue) {
      const selectedRows = rowsSelected(initialValue);
      setRowSelection(selectedRows);
    }
  }, [initialValue]);

  const columns = React.useMemo(() => {
    const defaultCellValue = "-";

    const getAllKeys = () => {
      const allKeys = new Set();
      data.forEach((item) => {
        Object.keys(item).forEach((key) => allKeys.add(key));
      });
      return Array.from(allKeys);
    };

    const allKeys = getAllKeys();

    const dynamicColumns = allKeys.map((key) => {
      return {
        accessorKey: key,
        id: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
        footer: (props) => props.column.id,
        cell: ({ row, getValue, column }) => {
          return row.original[key] || defaultCellValue;
        },
      };
    });
    if (enableRowSelection) {
      dynamicColumns.unshift({
        id: "select",
        header: ({ table }) =>
          !allowSingleRowSeclection && onSelectAll ? (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onClick: () => {
                  const isAllSelected = table.getIsAllRowsSelected();
                  table.toggleAllRowsSelected(!isAllSelected);
                  onSelectAll && onSelectAll(table.getRowModel().rows, isAllSelected)
                },
                //onChange: table.getToggleAllRowsSelectedHandler(),
                allowSingleRowSeclection: allowSingleRowSeclection,
              }}
            />
          ) : (
            <></>
          ),
        cell: ({ row }) => {
          return (
            <div className="h-[24px]">
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                  allowSingleRowSeclection: allowSingleRowSeclection,
                }}
              />
            </div>
          );
        },
        accessorKey: undefined,
        footer: undefined,
        enableSorting: false,
        enableHeaderFilter: false,
      });
    }

    return dynamicColumns;
  }, [data]);

  function filterDataKeys(obj) {
    const filteredObj = {};
    for (const key in obj) {
      if (key.startsWith("data_")) {
        filteredObj[key] = false;
      }
    }
    return filteredObj;
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
      sorting,
    },
    initialState: {
      columnVisibility: filterDataKeys(data[0]),
    },
    onPaginationChange,
    enableSorting: enableSorting || false,
    enableHeaderFilter: enableHeaderFilter || false,
    enableRowSelection: enableRowSelection || false,
    enableMultiRowSelection: allowSingleRowSeclection ? false : true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
    onSortingChange,
    getRowId,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    ...tableProps,
  });
  const getHeader = (cell, indx) => {
    if (indx == 0) {
      // console.log(cell.column.columnDef)
    }
    if (!(typeof cell.column.columnDef.header == "string")) {
      return <div className="flex justify-between w-full">
        {<span className=" md:hidden">
          {cell.column.columnDef.header && flexRender(cell.column.columnDef.header, cell.getContext())}
        </span>}
        <span className="text-left ">
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </span>
      </div>
    } else {
      return <span className="text-left">
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </span>

    }

  }

  useEffect(() => {
    table.setColumnVisibility(filterDataKeys(data[0]))
  }, [data]);

  return (
    <div className={`pt-4 overflow-x-auto overflow-y-hidden ${data.length > 0 ? 'border-2': ''} rounded-lg my-5 mx-3`}>
      {/* <div className="h-2" /> */}
      <table className="w-full font-inter">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="md:table-row hidden">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`md:table-cell px-1 pb-4 text-left align-middle whitespace-nowrap text-xs leading-none font-medium text-neutral-4 table-col ${wrapperHeaderClass}`}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center cursor-pointer gap-2 font-sans font-[400] text-[14px] leading-none"
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {enableSorting && header.column.getCanSort() && (
                          <span className={`flex flex-col gap-2`}>
                            {header.column.getIsSorted() === "asc" && (
                              <Image
                                src={"/images/saas/images/icons/chevron-up.svg"}
                                width="20"
                                height="20"
                                alt=""
                              />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <Image
                                src={
                                  "/images/saas/images/icons/chevron-down.svg"
                                }
                                width="20"
                                height="20"
                                alt=""
                              />
                            )}
                            {header.column.getIsSorted() !== "asc" &&
                              header.column.getIsSorted() !== "desc" && (
                                <Image
                                  src={
                                    "/images/saas/images/icons/chevron-up-down.svg"
                                  }
                                  width="20"
                                  height="20"
                                  alt=""
                                />
                              )}
                          </span>
                        )}
                        
                        {enableHeaderFilter && header.id !== 'select' && (
                          <span title="Filter" onClick={() => { onHeaderFilterClick() }}>
                            <Image
                              src={
                                "/images/icons/bars-filter.svg"
                              }
                              width="15"
                              height="15"
                              alt=""
                            />
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="table-body-mobile break-all md:break-normal">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row?.id}
                className={`md:table-row md:border-y-2 overflow-hidden rounded-lg  md:shadow-none hover:bg-neutral-2 max-md:mb-6 mb-10  md:mb-0 max-md:mx-2 max-md:even:bg-neutral-2 max-md:odd:bg-white md:px-4 px-0 py-2 ${row?.getIsSelected() ? "bg-[#DCE9FD80]" : ""
                  } ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={(e) => {
                  row?.id !== "select" && onRowClick && onRowClick(row?.original, row?.getIsSelected());
                  e.stopPropagation()
                }
                }
                onChange={() =>
                  row?.id !== "select" &&
                  onSelectionChange &&
                  onSelectionChange(row?.original, row?.getIsSelected())
                }
              >
                {row?.getVisibleCells().map((cell, indx) => {

                  return (
                    <td
                      key={cell.id}
                      className="relative table-col  md:table-cell flex flex-col  text-sm p-2 gap-2 md:p-3 text-gray-900 align-middle border-b border-gray-200"
                      data-label={
                        cell.column.columnDef.header
                          ? typeof cell.column.columnDef.header == "string"
                            ? String(cell.column.columnDef.header)
                            : ""
                          : ""
                      }
                    >
                      {
                        getHeader(cell, indx)
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col items-center gap-2 flex-wrap">
        {enableRowSelection && (
          <div className="pt-4">
            {!!Object?.keys(rowSelection).length && !allowSingleRowSeclection && (
              <div>
                {Object?.keys(rowSelection).length} of{" "}
                {table.getPreFilteredRowModel().rows.length} Total Rows Selected
              </div>
            )}
          </div>
        )}
        {showPagination && table.getRowModel()?.rows?.length > 0 && <RevampedPagination table={table} />}
      </div>
      {table.getRowModel()?.rows?.length <= 0 &&
        <div className={`flex flex-col items-center justify-center  ${showPagination ? "min-h-[200px]" : ""}`}>
          {showPagination ?
            <>
              <svg  width={83} height={72} viewBox="0 0 84 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="36.4527" cy="35.9996" rx="35.9996" ry="35.9996" fill="#E7F8FF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2109 26.3242C16.4495 26.3242 14.2109 28.5628 14.2109 31.3242V35.8975H14.314C14.2469 36.2242 14.2116 36.5626 14.2116 36.9091V66.9973C14.2116 69.7587 16.4502 71.9973 19.2116 71.9973H68.4464C71.2078 71.9973 73.4464 69.7587 73.4464 66.9973V36.9091C73.4464 34.1477 71.2078 31.9091 68.4464 31.9091H39.1252L35.8517 28.0768C34.9018 26.9646 33.5125 26.3242 32.0499 26.3242H19.2109Z" fill="#6F767E"/>
                <path d="M51.2866 19.7438C53.4012 22.6406 55.479 25.2183 55.0368 29.2048C54.7244 32.0205 53.8474 34.7995 52.1048 36.8575C49.3109 40.157 45.7755 41.5275 42.3884 38.692C41.1249 37.6342 39.627 36.5656 39.627 34.6036C39.627 33.1447 40.0809 31.7526 41.2066 30.9738C44.1207 28.9577 49.159 29.1695 51.6957 31.8256C53.9459 34.1817 55.2202 38.0443 53.9458 41.3914C52.9277 44.0655 50.0766 46.1135 47.7864 47.0916C46.0833 47.8189 44.2511 48.0406 42.4907 48.5199C40.5774 49.0408 38.6519 49.3881 36.6836 49.4503C33.9203 49.5376 29.9548 49.1383 28.1719 46.3971" stroke="#D9D9D9" stroke-linecap="round" stroke-dasharray="2 2"/>
                <path d="M21.3499 45.2269C22.053 43.2236 23.9446 41.8828 26.0677 41.8828H76.4552C79.9137 41.8828 82.3278 45.3099 81.1632 48.5665L73.9694 68.6825C73.2581 70.6714 71.3737 71.9988 69.2614 71.9988H19.0071C15.561 71.9988 13.148 68.5945 14.2893 65.3429L21.3499 45.2269Z" fill="#CDCDCD"/>
                <ellipse cx="46.6964" cy="14.3756" rx="2.39332" ry="1.29638" transform="rotate(78.0426 46.6964 14.3756)" fill="#676767"/>
                <ellipse cx="47.1277" cy="16.4526" rx="2.39332" ry="1.29638" fill="#949494"/>
                <ellipse cx="47.2189" cy="14.6667" rx="2.39332" ry="1.29638" transform="rotate(111.581 47.2189 14.6667)" fill="#949494"/>
                <circle cx="45.0299" cy="16.0533" r="0.498609" fill="#676767"/>
                <path d="M45.4609 17.0742C45.8721 17.7845 46.6686 18.2461 47.4545 18.4032" stroke="#949494" stroke-linecap="round"/>
                <path d="M46.4609 17.1289C46.7399 17.293 46.918 17.5871 47.2116 17.738C47.6486 17.9628 48.0738 18.0711 48.5652 18.1257" stroke="#949494" stroke-linecap="round"/>
              </svg>
              <p className="text-black text-base md:text-sm font-medium font-inter mt-4">
                No records to display yet.
              </p>
            </>
            :
            <>
              {/* <Image src={'/images/no-results.svg'} alt={'no results'} /> */}
              <svg  width={83} height={72} viewBox="0 0 84 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="36.4527" cy="35.9996" rx="35.9996" ry="35.9996" fill="#E7F8FF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2109 26.3242C16.4495 26.3242 14.2109 28.5628 14.2109 31.3242V35.8975H14.314C14.2469 36.2242 14.2116 36.5626 14.2116 36.9091V66.9973C14.2116 69.7587 16.4502 71.9973 19.2116 71.9973H68.4464C71.2078 71.9973 73.4464 69.7587 73.4464 66.9973V36.9091C73.4464 34.1477 71.2078 31.9091 68.4464 31.9091H39.1252L35.8517 28.0768C34.9018 26.9646 33.5125 26.3242 32.0499 26.3242H19.2109Z" fill="#6F767E"/>
                <path d="M51.2866 19.7438C53.4012 22.6406 55.479 25.2183 55.0368 29.2048C54.7244 32.0205 53.8474 34.7995 52.1048 36.8575C49.3109 40.157 45.7755 41.5275 42.3884 38.692C41.1249 37.6342 39.627 36.5656 39.627 34.6036C39.627 33.1447 40.0809 31.7526 41.2066 30.9738C44.1207 28.9577 49.159 29.1695 51.6957 31.8256C53.9459 34.1817 55.2202 38.0443 53.9458 41.3914C52.9277 44.0655 50.0766 46.1135 47.7864 47.0916C46.0833 47.8189 44.2511 48.0406 42.4907 48.5199C40.5774 49.0408 38.6519 49.3881 36.6836 49.4503C33.9203 49.5376 29.9548 49.1383 28.1719 46.3971" stroke="#D9D9D9" stroke-linecap="round" stroke-dasharray="2 2"/>
                <path d="M21.3499 45.2269C22.053 43.2236 23.9446 41.8828 26.0677 41.8828H76.4552C79.9137 41.8828 82.3278 45.3099 81.1632 48.5665L73.9694 68.6825C73.2581 70.6714 71.3737 71.9988 69.2614 71.9988H19.0071C15.561 71.9988 13.148 68.5945 14.2893 65.3429L21.3499 45.2269Z" fill="#CDCDCD"/>
                <ellipse cx="46.6964" cy="14.3756" rx="2.39332" ry="1.29638" transform="rotate(78.0426 46.6964 14.3756)" fill="#676767"/>
                <ellipse cx="47.1277" cy="16.4526" rx="2.39332" ry="1.29638" fill="#949494"/>
                <ellipse cx="47.2189" cy="14.6667" rx="2.39332" ry="1.29638" transform="rotate(111.581 47.2189 14.6667)" fill="#949494"/>
                <circle cx="45.0299" cy="16.0533" r="0.498609" fill="#676767"/>
                <path d="M45.4609 17.0742C45.8721 17.7845 46.6686 18.2461 47.4545 18.4032" stroke="#949494" stroke-linecap="round"/>
                <path d="M46.4609 17.1289C46.7399 17.293 46.918 17.5871 47.2116 17.738C47.6486 17.9628 48.0738 18.0711 48.5652 18.1257" stroke="#949494" stroke-linecap="round"/>
              </svg>
              <p className="text-black text-base md:text-sm font-medium font-inter mt-4">
                No records to display yet.
              </p>
              {/* <p className="text-xs md:text-base text-neutral-4 font-inter text-center">Start adding new records to see them here.</p> */}
            </>
          }
        </div>
      }
    </div>
  );
};

const IndeterminateCheckbox = ({
  indeterminate,
  allowSingleRowSeclection,
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <Checkbox
      classCheckboxTick={undefined}
      content={undefined}
      checked={undefined}
      onChange={undefined}
      reverse={undefined}
      size={undefined}
      disabled={undefined}
      type={allowSingleRowSeclection ? "rounded" : "squared"}
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};

RevampedTableUI.defaultProps = {
  data: [],
  enableRowSelection: true,
};

RevampedTableUI.propTypes = {
  data: PropTypes.array,
  enableRowSelection: PropTypes.bool,
};

export default RevampedTableUI;
