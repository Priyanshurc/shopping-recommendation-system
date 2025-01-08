import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getHeaderGroups,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";


function TableExpand({ onRowClick, tableData=[], newTableData=[], columns }) {
  const [data, setData] = React.useState([
    ...(tableData || []),  // Fallback to an empty array if tableData is undefined
    ...(newTableData || [])  // Same fallback for newTableData
  ]);
  

  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // getHeaderGroups: getHeaderGroups(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
    manualPagination: true,
  });

  return (
    <div className="py-4 overflow-x-auto overflow-y-auto ">
      <div className="h-2" />
      <table className="w-full font-inter  overflow-scroll">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="md:table-row border-b">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="md:table-cell first:border-r px-3 pb-4 text-left align-middle whitespace-nowrap text-xs leading-none font-medium text-neutral-4 table-col
                  "
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-scroll">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={`md:table-row overflow-hidden rounded-lg border-b  md:shadow-none hover:bg-neutral-2 ${
                  row?.getIsSelected() ? "bg-[#DCE9FD80]" : ""
                } ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={(e) => {
                  row?.id !== "select" && onRowClick && onRowClick(row?.original, row?.getIsSelected());
                  e.stopPropagation()
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="relative first:border-r table-cell  justify-between text-sm p-2 gap-2 md:p-3 text-gray-900 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableExpand;
