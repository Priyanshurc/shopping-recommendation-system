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

// Utility function to safely access nested object values
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj) || "-";
};

// IndeterminateCheckbox component
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

// Flatten nested data utility
const flattenNestedData = (nestedData) => {
  return nestedData.flatMap((section) =>
    section.rows.map((row) => ({
      ...row,
    }))
  );
};

// Filter columns to hide those with keys starting with "data_"
const filterColumns = (columns) => {
  return columns.filter((column) => !column.accessorKey.startsWith("data_"));
};

const TableWithGroupHeading = ({
  data = [],
  value = [],
  initialValue = null,
  enableRowSelection,
  onRowClick,
  onSelectionChange,
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
  const flattenedData = flattenNestedData(data); // Flatten the nested data

  const getRowId = React.useCallback((row) => row?.data_id, []);
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

    // Get all possible keys from the flattened data
    const allKeys = new Set();
    flattenedData.forEach((row) => {
      Object.keys(row).forEach((key) => allKeys.add(key));
    });

    const dynamicColumns = Array.from(allKeys).map((key) => ({
      accessorKey: key,
      id: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      footer: (props) => props.column.id,
      cell: ({ row }) => {
        const value = row.getValue(key);
        return typeof value === "object" || React.isValidElement(value)
          ? value
          : value || defaultCellValue;
      },
    }));

    // Filter out columns with keys starting with "data_"
    const visibleColumns = filterColumns(dynamicColumns);

    if (enableRowSelection) {
      visibleColumns.unshift({
        id: "select",
        header: ({ table }) =>
          !allowSingleRowSeclection ? (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                allowSingleRowSeclection: allowSingleRowSeclection,
              }}
            />
          ) : (
            <></>
          ),
        cell: ({ row }) => (
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
        ),
        accessorKey: undefined,
        footer: undefined,
        enableSorting: false,
        enableHeaderFilter: false,
      });
    }

    return visibleColumns;
  }, [flattenedData, enableRowSelection, allowSingleRowSeclection]);
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
    data: flattenedData,
    columns,
    state: {
      rowSelection,
      pagination,
      sorting,
    },
    initialState: {
      columnVisibility: filterDataKeys(flattenedData[0] || {}),
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

  return (
    <div className={`p-4 overflow-x-auto overflow-y-hidden bg-neutral-0 shadow-lg rounded-lg ${wrapperClass}`}>
      <div className="h-2" />
      <table className="w-full font-inter">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="md:table-row hidden">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="md:table-cell px-3 pb-4 text-left align-middle whitespace-nowrap text-xs leading-none font-medium text-neutral-4 table-col"
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
                        <span className="flex flex-col gap-1">
                          {header.column.getIsSorted() === "asc" && (
                            <Image
                              src="/images/saas/images/icons/chevron-up.svg"
                              width="20"
                              height="20"
                              alt="Ascending"
                            />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <Image
                              src="/images/saas/images/icons/chevron-down.svg"
                              width="20"
                              height="20"
                              alt="Descending"
                            />
                          )}
                        </span>
                      )}
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((section) => (
            <React.Fragment key={section.headerLabel}>
              <tr className="group-header">
                <td colSpan={columns.length} className="font-bold">
                  {section.headerLabel}
                </td>
              </tr>
              {section.rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column, colIndex) => {
                    const cellValue = row[column.accessorKey] || "-";
                    return (
                      <td
                        key={column.id}
                        className={`px-3 py-2 ${colIndex === 0 ? 'pl-4' : ''} whitespace-nowrap text-sm md:p-1 text-gray-900 align-middle`}
                      >
                        {colIndex === 0 ? (
                          <div className="h-[24px]">
                            <IndeterminateCheckbox
                              {...{
                                checked: rowSelection[row.data_id],
                                onChange: () => {
                                  const isSelected = rowSelection[row.data_id];
                                  onSelectionChange(row, !isSelected)
                                  setRowSelection((prev) => ({
                                    ...prev,
                                    [row.data_id]: !isSelected,
                                  }));
                                },
                              }}
                            />
                          </div>
                        ) : (
                          // Handle rendering HTML elements or components
                          typeof cellValue === "object" || React.isValidElement(cellValue)
                            ? cellValue
                            : cellValue
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td colSpan={columns.length} className="py-2 border-b border-neutral-1 last:border-b-0" />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className="hidden md:table-row">
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-3 py-2 text-left text-xs font-medium text-neutral-4"
                >
                  {flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      {showPagination && (
        <Pagination
          pageCount={pageCount}
          pagination={pagination}
          onPageChange={onPaginationChange}
        />
      )}
    </div>
  );
};

TableWithGroupHeading.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array,
  initialValue: PropTypes.any,
  enableRowSelection: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  allowSingleRowSeclection: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableHeaderFilter: PropTypes.bool,
  onHeaderFilterClick: PropTypes.func,
  showPagination: PropTypes.bool,
  onPaginationChange: PropTypes.func,
  pageCount: PropTypes.number,
  pagination: PropTypes.object,
  onSortingChange: PropTypes.func,
  sorting: PropTypes.array,
  wrapperClass: PropTypes.string,
};

export default TableWithGroupHeading;
