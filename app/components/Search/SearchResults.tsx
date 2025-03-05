'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cocktail } from '@/app/types/cocktail';

interface SearchResultsProps {
  searchTerm: string;
  onSelect: (cocktails: Cocktail[], searchTerm: string) => void;
  onResultsChange: (results: Cocktail[]) => void;
}

export const SearchResults = ({ searchTerm, onSelect, onResultsChange }: SearchResultsProps) => {
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cocktailSearch', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.trim() === '') {
        return [] as Cocktail[];
      }

      const response = await fetch(`/api/cocktails/search?term=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return (await response.json()) as Cocktail[];
    },
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes cache duration
  });

  useEffect(() => {
    if (searchResults) {
      onResultsChange(searchResults);
    }
  }, [searchResults, onResultsChange]);

  const handleSelect = (selected: Cocktail[]) => {
    onSelect(selected, searchTerm);
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

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No cocktails found with that name. Try another search term.
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto" role="listbox">
      <div
        className="px-4 py-2 text-sm border-b flex justify-between items-center cursor-pointer hover:bg-gray-100"
        onClick={() => searchResults.length > 0 && handleSelect(searchResults)}>
        <span className="text-gray-500">
          {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
        </span>

        {searchResults.length > 1 && (
          <span className="text-xs text-gray-500 ml-1">(Press Enter)</span>
        )}
      </div>

      <ul>
        {searchResults.map((cocktail) => (
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
    </div>
  );
};
