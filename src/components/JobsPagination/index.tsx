import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import { useJobsPageStore } from "@/lib/store/zustand";

const JobsPagination: React.FC<IJobsPaginationProps> = ({ maxVisiblePages = 4 }) => {
  const { currentPage, prevPage, nextPage, setCurrentPage, totalPages } = useJobsPageStore();

  const renderPageLinks = () => {
    const pageLinks = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setCurrentPage(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pageLinks;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default JobsPagination;
