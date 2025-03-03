'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cocktail } from '@/app/types/cocktail';

interface SearchResultsProps {
  searchTerm: string;
  onSelect: (cocktails: Cocktail[], searchTerm: string) => void;
}

export const SearchResults = ({ searchTerm, onSelect }: SearchResultsProps) => {
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cocktails', searchTerm],
    queryFn: async () => {
      const response = await fetch('/api/cocktails');
      if (!response.ok) {
        throw new Error('Failed to fetch cocktails');
      }
      const cocktails: Cocktail[] = await response.json();

      return cocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    },
    enabled: searchTerm.length > 0,
  });

  const handleSelect = (results: Cocktail[]) => {
    onSelect(results, searchTerm);
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error fetching cocktails. Please try again.
      </div>
    );
  }

  if (results && results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No cocktails found with that name. Try another search term.
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto" role="listbox">
      {results && (
        <>
          {results.length > 0 ? (
            <div
              className="px-4 py-2 text-sm border-b flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => results.length > 1 && handleSelect(results)}>
              <span className="text-gray-500">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </span>

              {results.length > 1 && (
                <span className="text-xs text-gray-500 ml-1">(Press Enter)</span>
              )}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm border-b text-center">
              <span className="text-gray-500">
                No cocktails found with that name. Try another search term.
              </span>
            </div>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((cocktail) => (
                <li
                  key={cocktail.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect([cocktail])}
                  role="option">
                  <div className="font-medium">{cocktail.name}</div>
                  <div className="text-xs text-gray-500">
                    {cocktail.category || 'Uncategorized'} • {cocktail.glass}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
