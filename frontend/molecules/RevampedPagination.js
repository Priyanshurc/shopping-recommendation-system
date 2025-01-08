import Button from "../../atoms/zenovo-sass/Button";
import { ArrowLeft, ArrowRight, Ellipsis } from "../../assets/Icons";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RevampedPagination = ({ table, onNextPage, onPrevPage, onGotoPage }) => {
  if (!table) {
    return <div></div>;
  }
  return (
    <div className="pagination-wrapper flex items-center justify-between gap-12 px-2 py-4">
      <div className="flex flex-row">
        <Button
            onClick={() => {
            table.previousPage();
            // onPrevPage && onPrevPage(table.getState().pagination.pageIndex);
            }}
            state={!table.getCanPreviousPage() ? "disabled" : "default"}
            primary={false}
            size={"small"}
            circular={true}
            className={"rounded-full w-10 h-10"}
        >
            <span className="flex justify-center leading-none items-center w-4 h-4">
            <FaChevronLeft size={20} />
            </span>
        </Button>
        <div className="flex items-center gap-4 px-4">
            {[1, 2, 3].slice(0, table.getPageCount()).map((i) => {
            return (
                <Button
                key={i}
                onClick={() => {
                    table.setPageIndex(i - 1);
                    // onGotoPage && onGotoPage(i);
                }}
                primary={
                    table.getState().pagination.pageIndex + 1 == i ? true : false
                }
                size={"small"}
                circular={true}
                className={"rounded-full w-10 h-10 text-center justify-center"}
                pagination={true}
                >
                <span className="flex justify-center leading-none items-center w-4 h-4 text-[13px]">
                    {i}
                </span>
                </Button>
            );
            })}
            {table.getPageCount() > 3 && (
            <>
                <Button
                onClick={() => {}}
                state={"default"}
                primary={false}
                size={"small"}
                circular={true}
                >
                <span className="flex justify-center leading-none items-center w-4 h-4">
                    <Ellipsis size={16} />
                </span>
                </Button>
                <Button
                onClick={() => {
                    table.setPageIndex(table.getPageCount() - 1);
                    // onGotoPage && onGotoPage(table.getPageCount());
                }}
                primary={
                    table.getState().pagination.pageIndex + 1 ==
                    table.getPageCount()
                    ? true
                    : false
                }
                size={"small"}
                circular={true}
                >
                <span className="flex justify-center leading-none items-center w-4 h-4 text-[13px]">
                    {/* {table.getState().pagination.pageSize} */}
                    {table.getPageCount()}
                </span>
                </Button>
            </>
            )}
        </div>
        <Button
            onClick={() => {
            table.nextPage();
            // onNextPage && onNextPage(table.getState().pagination.pageIndex + 2);
            }}
            state={!table.getCanNextPage() ? "disabled" : "default"}
            primary={false}
            size={"small"}
            circular={true}
            className={"rounded-full  w-10 h-10 justify-center"}>
            <span className="flex justify-center leading-none items-center w-4 h-4">
            <FaChevronRight size={20} />
            </span>
        </Button>
      </div>  
      <span className="flex items-center gap-1 ml-4">
        Page &nbsp;
        <select
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
            >
            {Array.from({ length: table.getPageCount() }, (_, i) => (
                <option key={i} value={i + 1}>
                {i + 1}
                </option>
            ))}
        </select> 
        of {table.getPageCount()}
      </span>
    </div>
  );
};

export default RevampedPagination;
