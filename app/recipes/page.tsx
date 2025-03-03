import { Metadata } from 'next';
import { Cocktail } from '@/app/types/cocktail';
import RecipesPage from './client';

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
    <RecipesPage
      initialCocktails={paginatedCocktails}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
