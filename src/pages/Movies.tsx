import { LogOut, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import Pagination from "../components/Pagination/Pagination";
import { MovieResponse } from "../definitions";
import { moviesApi } from "../services/movies";
import { useAuthStore } from "../store/authStore";

const Movies = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    if (!token) return;

    try {
      const response = await moviesApi.getMovies(token, {
        page: currentPage,
        limit: 8,
      });

      if (response.totalMovies === 0) {
        navigate("/empty");
        return;
      }

      setMovies(response.movies);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  }, [token, currentPage, navigate]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-white text-body-large">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-error text-body-regular text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center py-8 px-6 md:px-12 lg:px-16">
          <h1 className="text-white text-heading-2 md:text-heading-1 font-semibold flex items-center gap-3">
            My movies
            <button
              onClick={() => navigate("/create-movie")}
              className="inline-flex items-center justify-center w-6 h-6 mt-5 ml-3 rounded-full border border-white bg-transparent text-white hover:bg-white/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </h1>
          <button onClick={handleLogout} className="text-white hover:text-white/80 transition-colors">
            <LogOut className="w-6 h-6 mt-5 ml-3" />
          </button>
        </div>

        <div className="px-6 md:px-12 lg:px-16 pb-[280px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/edit-movie/${movie.id}`)}
                className="
                  bg-card 
                  rounded-3xl 
                  overflow-hidden 
                  cursor-pointer 
                  transition-all 
                  duration-200
                  group
                  p-3
                  hover:bg-card/40
                "
              >
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                </div>
                <div className="px-2 pt-4 pb-2">
                  <h3 className="text-white text-body-regular font-medium truncate">{movie.title}</h3>
                  <p className="text-white/70 text-body-small">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>

      <WaveDecoration />
    </div>
  );
};

export default Movies;
