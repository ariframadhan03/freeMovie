export interface PageResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenreResponse {
  genres: MovieGenre[];
}

export interface MovieGenre {
  id: number;
  name: string;
}
