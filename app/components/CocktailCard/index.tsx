import React from 'react';
import { Cocktail, SpecialIngredient, StandardIngredient } from '@/app/types/cocktail';

interface CocktailCardProps {
  cocktail: Cocktail;
}

export const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const { name, category, glass, ingredients, preparation, garnish } = cocktail;

  const renderIngredient = (ingredient: StandardIngredient | SpecialIngredient, index: number) => {
    if ('special' in ingredient) {
      return (
        <li key={`${name}-special-${index}`} className="text-sm">
          {ingredient.special}
        </li>
      );
    } else {
      const { amount, unit, ingredient: ingredientName, label } = ingredient;
      return (
        <li key={`${name}-ingredient-${index}`} className="text-sm">
          {amount} {unit} {ingredientName}
          {label && <span className="text-gray-600 italic"> ({label})</span>}
        </li>
      );
    }
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="block space-y-2 h-full">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="flex flex-wrap gap-1 mb-2">
          {category && (
            <span className="inline-block rounded bg-pink-200 px-2 py-1 text-xs font-semibold uppercase text-pink-800">
              {category}
            </span>
          )}
          <span className="inline-block rounded bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-800">
            {glass}
          </span>
        </div>

        <h3 className="text-lg font-bold">Ingredients</h3>
        <ul className="list-inside list-disc px-1 text-sm mb-2">
          {ingredients.map(renderIngredient)}
        </ul>

        {preparation && (
          <>
            <h3 className="text-lg font-bold">Preparation</h3>
            <div className="text-sm mb-2">{preparation}</div>
          </>
        )}

        {garnish && (
          <>
            <h3 className="text-lg font-bold">Garnish</h3>
            <div className="text-sm">{garnish}</div>
          </>
        )}
      </div>
    </div>
  );
};
