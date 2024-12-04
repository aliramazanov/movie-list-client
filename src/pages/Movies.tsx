import { LogOut, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { PageWrapper } from "../components/Wrapper/PageWrapper";
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
      <PageWrapper className="items-center justify-center">
        <p className="text-white text-body-large">Loading...</p>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper className="items-center justify-center">
        <p className="text-error text-body-regular text-center">{error}</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="pt-8">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="flex justify-between items-center py-8 px-4 mb-10 md:px-12 lg:px-16"
        >
          <h1 className="text-white text-heading-2 md:text-heading-1 font-semibold flex items-center gap-3">
            My movies
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-movie")}
              className="inline-flex items-center justify-center w-6 h-6 mt-4 ml-3 rounded-full border border-white bg-transparent text-white hover:bg-white/10 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="text-white hover:text-white/80 transition-colors"
          >
            <div className="flex items-center justify-center mt-4">
              <p className="hidden lg:block">Logout</p> <LogOut className="w-6 h-6 ml-3" />{" "}
            </div>
          </motion.button>
        </motion.div>
        <div className="px-4 md:px-12 lg:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
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
                  p-2
                  md:p-3
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
                <div className="px-2 pt-3 pb-2 md:pt-4">
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
              className="mt-8 mb-20"
            >
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Movies;
