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

const TableUI = ({
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
      return <div className="flex justify-between w-full ">
        {<span className=" md:hidden">
          {cell.column.columnDef.header && flexRender(cell.column.columnDef.header, cell.getContext())}
        </span>}
        <span className="text-right md:text-left">
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </span>
      </div>
    } else {
      return <span className="text-right md:text-left">
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
    <div className={`py-4 overflow-x-auto overflow-y-hidden ${wrapperClass}`}>
      <div className="h-2" />
      <table className="w-full font-inter">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="md:table-row hidden">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="md:table-cell px-3 pb-4 text-left align-middle whitespace-nowrap text-xs leading-none font-medium text-neutral-4 table-col
                  "
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center cursor-pointer gap-2 font-inter font-[600] text-[12px] leading-none"
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
                        {enableSorting && header.column.getCanSort() && (
                          <span className={`flex flex-col gap-1`}>
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
        <tbody className="table-body-mobile">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row?.id}
                className={`md:table-row overflow-hidden rounded-lg  md:shadow-none hover:bg-neutral-2 max-md:mb-6 mb-10  md:mb-0 max-md:mx-2 max-md:even:bg-neutral-2 max-md:odd:bg-white ${row?.getIsSelected() ? "bg-[#DCE9FD80]" : ""
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
                      className="relative table-col md:table-cell flex justify-between text-sm p-2 gap-2 md:p-3 text-gray-900 align-middle"
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
      <div className="flex flex-col items-end gap-2 flex-wrap">
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
        {showPagination && table.getRowModel()?.rows?.length > 0 && <Pagination table={table} />}
      </div>
      {table.getRowModel()?.rows?.length <= 0 &&
        <div className={`flex flex-col items-center justify-center  ${showPagination ? "min-h-[200px]" : ""}`}>
          {showPagination ?
            <>
              <div className="mt-10"></div>
              <Image src={'/images/no-results.svg'} alt={'no results'} width={233} height={200} />
              <p className="text-neutral-5 text-2xl font-semibold mt-8 font-inter text-center">
                No records to display yet.
              </p>
              <p className="text-base text-neutral-7 font-inter mb-10 text-center">Start adding new records to see them here.</p>
            </>
            :
            <>
              <Image src={'/images/no-results.svg'} alt={'no results'} width={150} height={100} />
              <p className="text-neutral-4 text-base md:text-xl font-semibold font-inter mt-4">
                No records to display yet.
              </p>
              <p className="text-xs md:text-base text-neutral-4 font-inter text-center">Start adding new records to see them here.</p>
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

TableUI.defaultProps = {
  data: [],
  enableRowSelection: true,
};

TableUI.propTypes = {
  data: PropTypes.array,
  enableRowSelection: PropTypes.bool,
};

export default TableUI;
