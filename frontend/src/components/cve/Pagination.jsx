import React from "react";
import { Button } from "../ui/Button";

const Pagination = ({
  currentPage,
  resultsPerPage,
  totalRecords,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalRecords);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>Results per page:</span>
        <select
          className="border rounded p-1"
          value={resultsPerPage}
          onChange={(e) => onPageChange(currentPage, Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1, resultsPerPage)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="px-2">
          {startIndex + 1}-{endIndex} of {totalRecords} records
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1, resultsPerPage)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
