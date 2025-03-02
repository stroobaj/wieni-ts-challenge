export interface Cocktail {
  glass: Glass;
  ingredients: (StandardIngredient | SpecialIngredient)[];
  name: string;
  category?: CocktailCategory;
  garnish?: string;
  preparation?: string;
}

export interface CocktailWithPopularity extends Cocktail {
  popularityScore: number;
}

export interface StandardIngredient {
  amount: number;
  ingredient: string;
  unit: string;
  label?: string;
}

export interface SpecialIngredient {
  special: string;
}

export type Glass =
  | 'champagne-flute'
  | 'champagne-tulip'
  | 'collins'
  | 'highball'
  | 'hot-drink'
  | 'hurricane'
  | 'margarita'
  | 'martini'
  | 'old-fashioned'
  | 'shot'
  | 'white-wine';

export type CocktailCategory =
  | 'After Dinner Cocktail'
  | 'All Day Cocktail'
  | 'Before Dinner Cocktail'
  | 'Hot Drink'
  | 'Longdrink'
  | 'Sparkling Cocktail';
