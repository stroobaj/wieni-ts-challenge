export default function Home() {
  return (
    <main>
      <div className="mb-4 space-y-3 rounded border border-gray-200 bg-white/25 p-5 text-sm">
        <p className="block text-radial">
          👷🏻‍♂️ Please remove this block and show the <strong>most popular recipes</strong> here.
        </p>
        <p className="block">
          <span>You can use the api endpoint </span>
          <code className="text-sm font-light">/api/recipes/popular</code>.
        </p>
      </div>
      <ul>
        <li></li>
      </ul>
    </main>
  );
}
