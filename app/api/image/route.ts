// app/api/image/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  // Fallback image if the key isn't provided or configured yet
  const fallbackUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800';

  if (!accessKey) {
    return NextResponse.json({ imageUrl: fallbackUrl });
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
        next: { revalidate: 86400 },
      }
    );

    // ADDED: Check if we hit the rate limit or another error before parsing JSON
    if (!res.ok) {
      console.warn(`Unsplash warning: ${res.statusText}`);
      return NextResponse.json({ imageUrl: fallbackUrl });
    }

    const data = await res.json();
    const imageUrl = data.results?.[0]?.urls?.regular || fallbackUrl;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return NextResponse.json({ imageUrl: fallbackUrl });
  }
}