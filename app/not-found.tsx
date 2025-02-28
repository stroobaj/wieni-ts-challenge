import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Oops! Lost your cocktail? 🍸</h1>
      <div className="bg-white/50 border border-gray-200 rounded p-8 mb-6 max-w-lg">
        <p className="mb-6">
          The requested page does not exist.
          <strong className="block">
            Perhaps it was <span className="text-pink-600">shaken</span>, not stirred?
          </strong>
        </p>

        <h2 className="motion-safe:animate-bounce mb-6 font-extrabold text-gray-900 text-5xl">
          404
        </h2>

        <p className="mb-6">
          Let&apos;s get you back to where you can find some tasty cocktail recipes!
        </p>

        <Link
          href="/"
          className="inline-block bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-700 transition-colors 
          focus:outline-none focus:ring-4 focus:ring-gray-500"
          aria-label="Return to homepage">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
