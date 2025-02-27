import cocktails from './cocktails.json';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  return new Response(JSON.stringify(cocktails));
}
