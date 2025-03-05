'use client';

import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/app/hooks/useDebounce';
import { SearchResults } from './SearchResults';
import { Cocktail } from '@/app/types/cocktail';
import { ClearSearchButton } from '@/app/components/Search/ClearSearchButton';
import { SearchTermIndicator } from '@/app/components/Search/SearchTermIndicator';
import { SearchIcon } from '@/app/components/Search/SearchIcon';

interface SearchProps {
  onSearch: (results: Cocktail[], searchTerm?: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [currentResults, setCurrentResults] = useState<Cocktail[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleClear = () => {
    setSearchTerm('');
    setShowResults(false);
    onSearch([], '');
    setActiveSearchTerm('');
    setCurrentResults([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchTerm) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && debouncedSearchTerm && currentResults.length > 0) {
      e.preventDefault();
      onSearch(currentResults, debouncedSearchTerm);
      setShowResults(false);
      setActiveSearchTerm(debouncedSearchTerm);
    }
  };

  const handleResultSelect = (selectedCocktails: Cocktail[], selectedSearchTerm: string) => {
    onSearch(selectedCocktails, selectedSearchTerm);
    setShowResults(false);
    setActiveSearchTerm(selectedSearchTerm);
  };

  const updateCurrentResults = (results: Cocktail[]) => {
    setCurrentResults(results);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setShowResults(true);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={'relative max-w-2xl mx-auto'}>
      <div className="h-6 mb-2">
        <SearchTermIndicator searchTerm={activeSearchTerm} />
      </div>

      <div className="relative">
        <SearchIcon />
        <input
          type="text"
          id="cocktail-search"
          className={`block w-full p-4 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:outline-none focus:ring-gray-500 ${
            isFocused ? 'border-gray-500' : ''
          }`}
          placeholder="Search for cocktails by name..."
          aria-label="Search for cocktails"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role="searchbox"
          autoComplete="off"
        />
        {searchTerm && <ClearSearchButton onClick={handleClear} />}
      </div>

      {showResults && debouncedSearchTerm && (
        <div className="absolute z-10 w-full">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <SearchResults
              searchTerm={debouncedSearchTerm}
              onSelect={handleResultSelect}
              onResultsChange={updateCurrentResults}
            />
          </div>
        </div>
      )}
    </div>
  );
};
