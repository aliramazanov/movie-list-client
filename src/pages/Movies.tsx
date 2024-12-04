import { LogOut, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import Pagination from "../components/Pagination/Pagination";
import { MovieResponse } from "../definitions";
import { moviesApi } from "../services/movies";
import { useAuthStore } from "../store/authStore";

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    return location.state?.page || 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const movieCardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.4,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <p className="text-white text-body-large">Loading...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <p className="text-error text-body-regular text-center">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-background pt-8"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="flex justify-between items-center py-8 px-6 mb-10 md:px-12 lg:px-16"
        >
          <h1 className="text-white text-heading-2 md:text-heading-1 font-semibold flex items-center gap-3">
            My movies
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-movie")}
              className="inline-flex items-center justify-center w-6 h-6 mt-5 ml-3 rounded-full border border-white bg-transparent text-white hover:bg-white/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="text-white hover:text-white/80 transition-colors"
          >
            <LogOut className="w-6 h-6 mt-5 ml-3" />
          </motion.button>
        </motion.div>

        <div className="px-6 md:px-12 lg:px-16 pb-[280px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={movieCardVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                onClick={() =>
                  navigate(`/edit-movie/${movie.id}`, {
                    state: { from: location.pathname, page: currentPage },
                  })
                }
                className="
                  bg-card 
                  rounded-3xl 
                  overflow-hidden 
                  cursor-pointer 
                  group
                  p-3
                  hover:bg-card/40
                "
              >
                <div className="aspect-[2/3] relative rounded-2xl overflow-hidden">
                  <motion.img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="px-2 pt-4 pb-2">
                  <h3 className="text-white text-body-regular font-medium truncate">{movie.title}</h3>
                  <p className="text-white/70 text-body-small">{movie.year}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </motion.div>
          )}
        </div>
      </div>

      <WaveDecoration />
    </motion.div>
  );
};

export default Movies;
