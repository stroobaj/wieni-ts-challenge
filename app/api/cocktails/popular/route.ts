import cocktails from '@/app/data/cocktails.json';
import { NextRequest } from 'next/server';
import { Cocktail, CocktailWithPopularity } from '@/app/types/cocktail';

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get('limit');

  const limit = limitParam ? parseInt(limitParam, 10) : 5;
  const validLimit = !isNaN(limit) && limit > 0 ? limit : 5;

  const cocktailsWithScores: CocktailWithPopularity[] = (cocktails as Cocktail[]).map(
    (cocktail) => {
      return {
        ...cocktail,
        popularityScore: Math.floor(Math.random() * 100) + 1,
      };
    },
  );

  const popularCocktails = cocktailsWithScores
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, validLimit);

  console.log('Popular cocktails:', popularCocktails);

  return Response.json(popularCocktails);
}
