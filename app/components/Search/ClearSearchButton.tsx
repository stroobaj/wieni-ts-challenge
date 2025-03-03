'use client';

import React from 'react';

interface ClearSearchButtonProps {
  onClick: () => void;
}

export const ClearSearchButton = ({ onClick }: ClearSearchButtonProps) => (
  <button
    type="button"
    className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-gray-500 hover:text-gray-700"
    onClick={onClick}
    aria-label="Clear search">
    <svg
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
    <span className="sr-only">Clear search</span>
  </button>
);
