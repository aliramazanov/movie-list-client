import { ApiError } from "./api";
import { API_BASE_URL } from "./base-url";

export interface MovieResponse {
  id: string;
  title: string;
  year: number;
  poster?: string;
  userId: string;
  createdAt: Date;
}

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

export type MovieSortBy = "createdAt" | "title" | "year";

interface MovieQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: MovieSortBy;
  order?: "asc" | "desc";
}

export const moviesApi = {
  getMovies: async (token: string, params: MovieQueryParams = {}): Promise<MoviePaginationResponse> => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/movie?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError("Failed to fetch movies", response.status);
      }

      const data = await response.json();

      if (!data.movies || !Array.isArray(data.movies) || typeof data.total !== "number") {
        throw new ApiError("Invalid response format");
      }

      return data as MoviePaginationResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if ((error as Error).name === "AbortError") {
        throw new ApiError("Request timed out");
      }
      throw new ApiError("Failed to fetch movies");
    }
  },

  getMovie: async (token: string, id: string): Promise<MovieResponse> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/movie/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError("Failed to fetch movie", response.status);
      }

      const data = await response.json();
      return data as MovieResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if ((error as Error).name === "AbortError") {
        throw new ApiError("Request timed out");
      }
      throw new ApiError("Failed to fetch movie");
    }
  },

  createMovie: async (token: string, formData: FormData): Promise<MovieResponse> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError("Failed to create movie", response.status);
      }

      const data = await response.json();
      return data as MovieResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if ((error as Error).name === "AbortError") {
        throw new ApiError("Request timed out");
      }
      throw new ApiError("Failed to create movie");
    }
  },

  updateMovie: async (token: string, id: string, formData: FormData): Promise<MovieResponse> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError("Failed to update movie", response.status);
      }

      const data = await response.json();
      return data as MovieResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if ((error as Error).name === "AbortError") {
        throw new ApiError("Request timed out");
      }
      throw new ApiError("Failed to update movie");
    }
  },

  deleteMovie: async (token: string, id: string): Promise<{ id: string; message: string }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError("Failed to delete movie", response.status);
      }

      const data = await response.json();
      return data as { id: string; message: string };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if ((error as Error).name === "AbortError") {
        throw new ApiError("Request timed out");
      }
      throw new ApiError("Failed to delete movie");
    }
  },
};
