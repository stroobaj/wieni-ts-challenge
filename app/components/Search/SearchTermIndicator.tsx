'use client';

import React from 'react';

interface SearchTermIndicatorProps {
  searchTerm: string;
}

export const SearchTermIndicator = ({ searchTerm }: SearchTermIndicatorProps) => {
  if (!searchTerm) return null;

  return (
    <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700 inline-block">
      {`Showing results for: "${searchTerm}"`}
    </span>
  );
};
