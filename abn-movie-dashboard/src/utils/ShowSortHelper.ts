import type { Show } from '@/types/Show';

export function groupAndSortGenres(shows: Show[]): [string, Show[]][] {
  const genreMap: Record<string, Show[]> = {};

  shows.forEach(show => {
    show.genres.forEach(genre => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(show);
    });
  });

  return Object.entries(genreMap).sort(([aGenre, aShows], [bGenre, bShows]) => {
    if (aGenre.toLowerCase() === 'anime') return -1;
    if (bGenre.toLowerCase() === 'anime') return 1;
    return bShows.length - aShows.length;
  });
}
