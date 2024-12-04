import { PaginationProps } from "../../definitions";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-white/70 hover:text-white disabled:text-white/30 disabled:cursor-not-allowed transition-colors font-semibold mr-1"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-8 h-8 rounded-md flex items-center justify-center m-1 p-1 text-white
            ${currentPage === page ? "bg-primary" : "hover:bg-white/10 transition-colors"}
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-white/70 hover:text-white disabled:text-white/30 disabled:cursor-not-allowed transition-colors font-semibold ml-1"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
