import { Metadata } from 'next';
import { CocktailCard } from '@/app/components/CocktailCard';
import { Pagination } from '@/app/components/Pagination';
import { Cocktail } from '@/app/types/cocktail';

export const metadata: Metadata = {
  title: 'Cocktail Recipes',
  description: 'Browse our collection of cocktail recipes',
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const COCKTAILS_PER_PAGE = 10;

const getCocktails = async (): Promise<Cocktail[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cocktails`);

  if (!res.ok) {
    throw new Error('Failed to fetch cocktails');
  }

  return (await res.json()) as Cocktail[];
};

export default async function Page({ searchParams }: PageProps) {
  let cocktails: Cocktail[] = [];
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page || 1);

  try {
    cocktails = await getCocktails();
  } catch (error) {
    console.error('Error fetching cocktails:', error);
  }

  const totalPages = Math.ceil(cocktails.length / COCKTAILS_PER_PAGE);
  const paginatedCocktails = cocktails.slice(
    (currentPage - 1) * COCKTAILS_PER_PAGE,
    currentPage * COCKTAILS_PER_PAGE,
  );

  return (
    <main className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">All Cocktail Recipes</h1>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-3"></div>
        <p className="text-gray-600">Discover our collection of classic and innovative cocktails</p>
      </div>

      {paginatedCocktails.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {paginatedCocktails.map((cocktail) => (
            <li className="flex flex-col h-full" key={cocktail.name}>
              <CocktailCard cocktail={cocktail} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-6">No cocktails found.</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
