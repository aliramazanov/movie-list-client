import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { WaveDecoration } from "../components/Additional/WaveDecoration";
import Primary from "../components/Button/Primary";

const Empty: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleAddMovie = () => {
    navigate("/create-movie");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center relative px-4 md:px-0"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[480px] mx-auto flex flex-col items-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-white text-heading-3 md:text-heading-2 font-semibold text-center mb-8"
        >
          Your movie list is empty
        </motion.h1>
        <motion.div variants={itemVariants} className="w-full max-w-[220px]">
          <Primary onClick={handleAddMovie}>Add a new movie</Primary>
        </motion.div>
      </motion.div>
      <WaveDecoration />
    </motion.div>
  );
};

export default Empty;
