import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../services/movies";
import { useAuthStore } from "../../store/authStore";
import { MovieQueryParams } from "../../definitions";

export const useMovies = (params: MovieQueryParams) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => moviesApi.getMovies(token!, params),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovie = (id: string) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => moviesApi.getMovie(token!, id),
    enabled: !!token && !!id,
  });
};
