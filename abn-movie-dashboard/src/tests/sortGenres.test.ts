import { describe, it, expect } from 'vitest';
import { groupAndSortGenres } from '@/utils/ShowSortHelper';
import type { Show } from '@/types/Show';

describe('groupAndSortGenres', () => {
  it('should group shows by genre and sort them correctly', () => {
    // Mock data
    const shows: Show[] = [
      { id: 1, title: 'Grave of the fireflies', genres: ['Drama'] },
      { id: 2, title: 'Death Note', genres: ['Thriller'] },
      { id: 3, title: 'Gundam SEED', genres: ['Drama', 'Anime'] },
      { id: 4, title: 'Naruto', genres: ['Action'] },
      { id: 5, title: 'One Piece', genres: ['Comedy'] },
    ];

    // Expected result
    const expected = [
      { genre: 'Anime', shows: [{ id: 3, title: 'Gundam SEED', genres: ['Drama', 'Anime'] }] },
      { genre: 'Drama', shows: [
          { id: 1, title: 'Grave of the fireflies', genres: ['Drama'] },
          { id: 3, title: 'Gundam SEED', genres: ['Drama', 'Anime'] },
        ] },
      { genre: 'Thriller', shows: [{ id: 2, title: 'Death Note', genres: ['Thriller'] }] },
      { genre: 'Action', shows: [{ id: 4, title: 'Naruto', genres: ['Action'] }] },
      { genre: 'Comedy', shows: [{ id: 5, title: 'One Piece', genres: ['Comedy'] }] },
    ];

    // Call the function
    const result = groupAndSortGenres(shows);

    // Assertions
    expect(result).toEqual(expected);
  });
});