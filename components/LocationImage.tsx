// components/LocationImage.tsx
'use client';

import { useState, useEffect } from 'react';

interface LocationImageProps {
  query: string;
  alt: string;
}

export default function LocationImage({ query, alt }: LocationImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        const res = await fetch(`/api/image?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (isMounted) {
          setImageUrl(data.imageUrl);
        }
      } catch {
        if (isMounted) {
          setImageUrl('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (loading) {
    return (
      <div 
        className="w-full h-48 animate-pulse rounded-xl mb-4 flex items-center justify-center text-xs font-semibold"
        style={{ backgroundColor: '#e2e8f0', color: '#94a3b8' }}
      >
        Searching photo...
      </div>
    );
  }

  return (
    <div 
      className="w-full h-48 overflow-hidden rounded-xl mb-4 shadow-sm border" 
      style={{ borderColor: '#f1f5f9' }}
    >
      <img 
        src={imageUrl || ''} 
        alt={alt} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        crossOrigin="anonymous" // Helps prevent PDF Canvas CORS issues with images
      />
    </div>
  );
}