import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MovieResponse } from "../../definitions";
import { moviesApi } from "../../services/movies";
import { useAuthStore } from "../../store/authStore";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation<MovieResponse, Error, FormData>({
    mutationFn: (formData: FormData) => moviesApi.createMovie(token!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      moviesApi.updateMovie(token!, id, formData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", id] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (id: string) => moviesApi.deleteMovie(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
