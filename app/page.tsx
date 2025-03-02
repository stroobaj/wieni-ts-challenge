import { Metadata } from 'next';
import { CocktailCard } from '@/app/components/CocktailCard';
import { CocktailWithPopularity } from '@/app/types/cocktail';

export const metadata: Metadata = {
  title: 'Cocktail Recipes - Popular Cocktails',
  description: 'Discover our most popular cocktails',
};

const getPopularCocktails = async (limit: number = 5): Promise<CocktailWithPopularity[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/cocktails/popular?limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch popular cocktails');
  }

  return (await res.json()) as CocktailWithPopularity[];
};

export default async function Home() {
  let sortedCocktails: CocktailWithPopularity[] = [];
  try {
    const cocktails = await getPopularCocktails(5);
    sortedCocktails = [...cocktails].sort((a, b) => b.popularityScore - a.popularityScore);
  } catch (error) {
    console.error('Error fetching popular cocktails:', error);
  }
  const hasPopularCocktails = sortedCocktails.length > 0;

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Popular Cocktails</h1>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-3"></div>
        {hasPopularCocktails ? (
          <p className="text-gray-600">Discover our most popular cocktails</p>
        ) : (
          <p className="text-gray-600">No popular cocktails found</p>
        )}
      </div>

      {hasPopularCocktails ? (
        <ul className="mt-6 list-none p-0">
          {sortedCocktails.map((cocktail) => (
            <li className="mb-6" key={cocktail.name}>
              <CocktailCard cocktail={cocktail} />
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
