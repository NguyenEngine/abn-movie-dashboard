import { describe, it, expect } from 'vitest';
import { groupAndSortGenres } from '../utils/ShowSortHelper';
import type { Show } from '../types/Show';

describe('groupAndSortGenres', () => {
  const mockShows: Show[] = [
    { id: 1, name: 'Naruto', genres: ['Anime', 'Action'], rating: { average: 8 } },
    { id: 2, name: 'Friends', genres: ['Comedy'], rating: { average: 7 } },
    { id: 3, name: 'One Piece', genres: ['Anime'], rating: { average: 9 } },
    { id: 4, name: 'Breaking Bad', genres: ['Drama'], rating: { average: 9.5 } },
    { id: 5, name: 'Better Call Saul', genres: ['Drama'], rating: { average: 9 } },
    { id: 6, name: 'Attack on Titan', genres: ['Anime', 'Drama'], rating: { average: 9.2 } },
    { id: 7, name: 'Brooklyn 99', genres: ['Comedy'], rating: { average: 9.2 } },
  
];


  it('should group shows by genre and sort with Anime first and then by count', () => {
    // Act
    const result = groupAndSortGenres(mockShows);

    // Assert
    expect(result[0][0]).toBe('Anime'); // Anime first
    expect(result[1][0]).toBe('Drama'); // Drama has 3 shows
    expect(result[2][0]).toBe('Comedy'); // Comedy has 2 show
    expect(result[3][0]).toBe('Action'); // Action has 1 show

    // Ensure each genre has correct count
    const genreCounts = Object.fromEntries(result.map(([g, s]) => [g, s.length]));
    expect(genreCounts['Anime']).toBe(3);
    expect(genreCounts['Drama']).toBe(3);
  });
});
