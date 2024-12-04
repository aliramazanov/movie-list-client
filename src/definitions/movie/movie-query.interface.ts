import { MovieSortBy } from "./movie-sort.type";

export interface MovieQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: MovieSortBy;
  order?: "asc" | "desc";
}
