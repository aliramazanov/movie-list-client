import { MovieResponse } from "./movie-response.interface";

export interface MoviePaginationResponse {
  movies: MovieResponse[];
  total: number;
  totalMovies: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
