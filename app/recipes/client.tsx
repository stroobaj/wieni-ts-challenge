'use client';

import { useState } from 'react';
import { Search, SearchProvider } from '@/app/components/Search';
import { Cocktail } from '@/app/types/cocktail';
import { CocktailCard } from '@/app/components/CocktailCard';
import { Pagination } from '@/app/components/Pagination';

export default function RecipesPage({
  initialCocktails,
  currentPage,
  totalPages,
}: {
  initialCocktails: Cocktail[];
  currentPage: number;
  totalPages: number;
}) {
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>(initialCocktails);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (results: Cocktail[], query: string = '') => {
    if (results.length === 0 && !query) {
      setFilteredCocktails(initialCocktails);
      setIsSearching(false);
      setSearchQuery('');
    } else {
      setFilteredCocktails(results);
      setIsSearching(query.length > 0);
      setSearchQuery(query);
    }
  };

  return (
    <SearchProvider>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">All Cocktail Recipes</h1>
          <div className="w-24 h-1 bg-gray-800 mx-auto mb-3"></div>
          <p className="text-gray-600 mb-2">
            Discover our collection of classic and innovative cocktails
          </p>

          <Search onSearch={(results, query) => handleSearch(results, query)} />
        </div>

        {filteredCocktails.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredCocktails.map((cocktail) => (
              <li className="flex flex-col h-full" key={cocktail.name}>
                <CocktailCard cocktail={cocktail} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-2">
              {isSearching ? `No cocktails found matching "${searchQuery}"` : 'No cocktails found.'}
            </p>
            {isSearching && (
              <p className="text-gray-500">Try a different name or browse all our cocktails.</p>
            )}
          </div>
        )}

        {!isSearching && totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </SearchProvider>
  );
}
