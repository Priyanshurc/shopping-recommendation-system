import PropTypes from "prop-types";
import IcomoonIcon from "../atoms/IcomoonIcon";

const noop = () => {};
const MAX_VISIBLE_PAGES = 5;

export const _getAttributes = (totalPages, selectedPage = 1, segmentSize = MAX_VISIBLE_PAGES) => {
    const pageSegments = [...new Array(totalPages)]
        .map((p, i) => i + 1)
        .reduce((segments, page, i) => {
            const segmentIndex = Math.floor(i / segmentSize);
            if (!segments[segmentIndex]) {
                segments[segmentIndex] = [];
            }
            segments[segmentIndex].push(page);
            return segments;
        }, []);

    const visiblePages = pageSegments.filter((segment) => segment.includes(selectedPage))[0];
    const selectedIndex = visiblePages?.indexOf(selectedPage);

    const showPrev = !visiblePages?.includes(1);
    const showNext = !visiblePages?.includes(totalPages);

    const firstPage = !visiblePages?.includes(1) && 1;
    const lastPage = !visiblePages?.includes(totalPages) && totalPages;

    return {
        visiblePages,
        selectedIndex,
        firstPage,
        lastPage,
        showPrev,
        showNext,
    };
};

const Pagination = ({ paginationClass = "justify-end", totalPages, defaultSelectedPage = 1, selectedPage, setSelectedPage, handlePagination }) => {
    const normalState = "flex items-center justify-center text-xs 2xl:text-sm leading-5 w-6 h-6 2xl:w-8 2xl:h-8 rounded border border-neutral-300 bg-white hover:bg-primary-50";
    const ellipsisState = "flex items-end justify-center text-black";
    if (defaultSelectedPage > totalPages || defaultSelectedPage < 1) {
        defaultSelectedPage = 1;
    }
    if (totalPages < 1) {
        totalPages = 1;
    }
    const { visiblePages, selectedIndex, firstPage, lastPage } = _getAttributes(totalPages, selectedPage);

    const handlePageClick = ({ target }) => {
        const page = parseInt(target.dataset.page, 10);
        setSelectedPage(page);
        handlePagination(page);
    };

    const handlePrevClick = () => {
        const newSelectedPage = selectedPage - 1;
        setSelectedPage(newSelectedPage);
        handlePagination(newSelectedPage);
    };

    const handleNextClick = () => {
        const newSelectedPage = selectedPage + 1;
        setSelectedPage(newSelectedPage);
        handlePagination(newSelectedPage);
    };

    const pagination = (
        <div className={`flex items-center ${paginationClass}`}>
            <nav aria-label="pagination">
                <ul className="flex space-x-2">
                    <li className="select-none cursor-pointer">
                        <span
                            role="button"
                            tabIndex={0}
                            aria-disabled={selectedPage === 1}
                            aria-label="Previous page"
                            onClick={handlePrevClick}
                            onKeyUp={({ key }) => {
                                if (key === "Enter") {
                                    handlePrevClick();
                                }
                            }}
                            className={`${normalState} ${selectedPage === 1 && "opacity-50 pointer-events-none"}`}
                        >
                            <IcomoonIcon icon={"angle-left"} size={24} />
                        </span>
                    </li>

                    {firstPage && (
                        <li className="">
                            <span
                                role="button"
                                tabIndex={0}
                                aria-label="First page"
                                onClick={handlePageClick}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handlePageClick(e);
                                    }
                                }}
                                data-page={firstPage}
                                className={`${normalState}`}
                            >
                                {firstPage.toString()}
                            </span>
                        </li>
                    )}
                    {firstPage && (
                        <li className={`${ellipsisState} `}>
                            <div className="ellipsis">&hellip;</div>
                        </li>
                    )}

                    {visiblePages?.map((page, i) => (
                        <li key={i}>
                            <span
                                role="button"
                                tabIndex={0}
                                className={`${normalState} ${i === selectedIndex && "border-primary-300 text-primary-900 bg-primary-50"}`}
                                data-page={page}
                                onClick={handlePageClick}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handlePageClick(e);
                                    }
                                }}
                                aria-label={`Page ${page}`}
                                aria-current={i === selectedIndex && "page"}
                            >
                                {page.toString()}
                            </span>
                        </li>
                    ))}

                    {lastPage && (
                        <li className={`${ellipsisState}`}>
                            <div className="ellipsis">&hellip;</div>
                        </li>
                    )}
                    {lastPage && (
                        <li>
                            <span
                                role="button"
                                tabIndex={0}
                                aria-label="Last page"
                                onClick={handlePageClick}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handlePageClick(e);
                                    }
                                }}
                                data-page={lastPage}
                                className={`${normalState}`}
                            >
                                {lastPage.toString()}
                            </span>
                        </li>
                    )}

                    <li className="select-none cursor-pointer">
                        <span
                            role="button"
                            tabIndex={0}
                            aria-disabled={selectedPage === totalPages}
                            aria-label="Next page"
                            onClick={handleNextClick}
                            onKeyUp={({ key }) => {
                                if (key === "Enter") {
                                    handleNextClick();
                                }
                            }}
                            className={` ${normalState} ${selectedPage === totalPages && "opacity-50 pointer-events-none"}`}
                        >
                            <IcomoonIcon icon={"angle-right"} size={25} />
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    );

    return pagination;
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    defaultSelectedPage: PropTypes.number,
};

export default Pagination;
