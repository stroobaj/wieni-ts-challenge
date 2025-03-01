import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const buttonClassNames =
    'w-10 h-10 flex items-center justify-center rounded bg-gray-900 text-white text-sm transition-all hover:bg-gray-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50';

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-1.5 my-5">
      {currentPage > 1 && (
        <a href={'?page=1'} className={buttonClassNames} aria-label="First page">
          ««
        </a>
      )}

      {currentPage > 1 && (
        <a
          href={`?page=${currentPage - 1}`}
          className={buttonClassNames}
          aria-label="Previous page">
          «
        </a>
      )}

      <div className="h-10 px-3 flex items-center justify-center rounded bg-gray-800 text-white text-sm font-medium">
        Page {currentPage}
      </div>

      {currentPage < totalPages && (
        <a href={`?page=${currentPage + 1}`} className={buttonClassNames} aria-label="Next page">
          »
        </a>
      )}
    </div>
  );
};
