'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SyncPage() {
  const router = useRouter();

  useEffect(() => {
    const sincronizar = async () => {
      try {
        const res = await fetch('/api/sync');

        if (res.ok) {
          // Esperar 0.5s opcional para efecto visual
          setTimeout(() => {
            router.replace('/indicator');
          }, 200);
        } else {
          console.error('Error al sincronizar los datos');
        }
      } catch (error) {
        console.error('Error conectando al endpoint:', error);
      }
    };

    sincronizar();
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold">Sincronizando datos...</h1>
      <p className="text-gray-500 mt-2">Un momento por favor</p>
    </main>
  );
}
