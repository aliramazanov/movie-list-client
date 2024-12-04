import { motion } from "motion/react";
import { PaginationProps } from "../../definitions";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-white/70 hover:text-white disabled:text-white/30 disabled:cursor-not-allowed transition-colors font-semibold mr-1"
      >
        Prev
      </motion.button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(page)}
          className={`
            w-8 h-8 rounded-md flex items-center justify-center m-1 p-1 text-white
            ${currentPage === page ? "bg-primary" : "hover:bg-white/10 transition-colors"}
          `}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-white/70 hover:text-white disabled:text-white/30 disabled:cursor-not-allowed transition-colors font-semibold ml-1"
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;
