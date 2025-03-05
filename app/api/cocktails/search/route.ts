import cocktails from '@/app/data/cocktails.json';
import { NextRequest } from 'next/server';
import { Cocktail } from '@/app/types/cocktail';

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get('term') || '';

  let results: Cocktail[] = [];

  if (searchTerm.trim() === '') {
    results = [];
  } else {
    const normalizedSearchTerm = searchTerm.toLowerCase();

    results = (cocktails as Cocktail[]).filter((cocktail) =>
      cocktail.name.toLowerCase().includes(normalizedSearchTerm),
    );
  }

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
    },
  });
}
