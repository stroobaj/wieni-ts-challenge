/**
 * TODO: This is an example card without any props.
 */

export const Card = () => {
  return (
    <div className="flex border border-gray-200 bg-white/50 p-4">
      <div className="block space-y-2">
        <h2 className="text-2xl font-bold">Spritz Veneziano</h2>
        <span className="mr-1 inline-block rounded bg-pink-200 px-2 py-1 text-xs font-semibold uppercase text-pink-600 last:mr-0">
          Sparkling Cocktail
        </span>

        <h3 className="text-lg font-bold">Ingredients</h3>
        <ul className="list-inside list-disc px-1 text-sm">
          <li>6 cl Prosecco</li>
          <li>4 cl Aperol</li>
        </ul>

        <h3 className="text-lg font-bold">Preparation</h3>
        <div className="text-sm">
          Build into an old-fashioned glass filled with ice. Top with a splash of soda water.
        </div>
      </div>
    </div>
  );
};
