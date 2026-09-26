import { NextResponse } from 'next/server';

// Banco de dados manual provisório
const DUMMY_MOVIES = [
  { id: 100, title: 'Agente Kim: Reativado', cover_image: 'https://image.tmdb.org/t/p/w500/gxwdBZy2fwVn3cNnc1h0CKP4pcC.jpg', release_year: 2024 },
  { id: 1, title: 'Beleza Verdadeira', cover_image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', release_year: 2020 },
  { id: 2, title: 'Sorriso Real', cover_image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&auto=format&fit=crop', release_year: 2023 },
  { id: 3, title: 'Pousando no Amor', cover_image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop', release_year: 2019 },
  { id: 4, title: 'Vincenzo', cover_image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800&auto=format&fit=crop', release_year: 2021 },
  { id: 5, title: 'Alquimia das Almas', cover_image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop', release_year: 2022 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  try {
    let results = DUMMY_MOVIES;

    if (query) {
      results = DUMMY_MOVIES.filter(movie => movie.title.toLowerCase().includes(query));
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}
