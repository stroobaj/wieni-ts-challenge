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
    limit?: string;
  }>;
}

interface PaginatedResponse {
  cocktails: Cocktail[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const getCocktails = async (page: number = 1, limit: number = 10): Promise<PaginatedResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/cocktails?page=${page}&limit=${limit}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch cocktails');
  }

  return await res.json();
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);

  let cocktails: Cocktail[] = [];
  let totalPages = 1;
  let currentPage = page;

  try {
    const response = await getCocktails(page, limit);
    cocktails = response.cocktails;
    totalPages = response.pagination.totalPages;
    currentPage = response.pagination.page;
  } catch (error) {
    console.error('Error fetching cocktails:', error);
  }

  return (
    <RecipesPage initialCocktails={cocktails} currentPage={currentPage} totalPages={totalPages} />
  );
}
