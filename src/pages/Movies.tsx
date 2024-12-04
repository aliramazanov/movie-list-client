import { LogOut, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import { MovieResponse, moviesApi } from "../services/movies";
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
    <div className="min-h-screen bg-background flex flex-col px-6 md:px-12 lg:px-16">
      {/* Header */}
      <div className="flex justify-between items-center py-8 max-w-[1440px] w-full mx-auto">
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

      {/* Movies Grid */}
      <div className="max-w-[1440px] w-full mx-auto mt-8">
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-white disabled:text-white/50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${currentPage === page ? "bg-primary text-white" : "text-white hover:bg-white/10"}
              `}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-white disabled:text-white/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      <WaveDecoration />
    </div>
  );
};

export default Movies;
