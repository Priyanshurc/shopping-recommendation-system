import { useState } from "react";
export function usePagination(perPageSize, defaultIndex, onPagination) {
    const [pagination, setPagination] = useState({
        pageSize: perPageSize,
        pageIndex: defaultIndex,
    });
    const { pageSize, pageIndex } = pagination;

    return {
        limit: pageSize,
        onPaginationChange: setPagination,
        pagination,
        skip: pageSize * pageIndex,
    };
}