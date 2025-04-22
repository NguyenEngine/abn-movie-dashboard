import type { Show } from '@/types/Show'
import type GenreShowsList from '@/types/GenreShowsList'

export function groupAndSortGenres(shows: Show[]): GenreShowsList[] {
  const genreMap: Record<string, Show[]> = {}

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = []
      genreMap[genre].push(show)
    })
  })

  return Object.entries(genreMap)
    .sort(([aGenre, aShows], [bGenre, bShows]) => {
      if (aGenre.toLowerCase() === 'anime') return -1
      if (bGenre.toLowerCase() === 'anime') return 1
      return bShows.length - aShows.length
    })
    .map(([genre, shows]) => ({
      genre,
      shows,
    }))
}
