import cocktails from '@/app/data/cocktails.json';
import { NextRequest } from 'next/server';
import { Cocktail } from '@/app/types/cocktail';

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1e3));

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const validPage = !isNaN(page) && page > 0 ? page : 1;
  const validLimit = !isNaN(limit) && limit > 0 && limit <= 50 ? limit : 10;

  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;

  const paginatedCocktails = (cocktails as Cocktail[]).slice(startIndex, endIndex);
  const totalCocktails = (cocktails as Cocktail[]).length;
  const totalPages = Math.ceil(totalCocktails / validLimit);

  return Response.json({
    cocktails: paginatedCocktails,
    pagination: {
      page: validPage,
      limit: validLimit,
      totalItems: totalCocktails,
      totalPages: totalPages,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    },
  });
}
