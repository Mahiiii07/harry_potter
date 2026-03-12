"use client";
import { useRouter } from "next/navigation";

export default function Pagination({ totalPages, currentPage, searchTerm }) {
  const router = useRouter();

  const createPageUrl = (pageNumber) => {
    if (searchTerm) {
      return `?page=${pageNumber}&search=${encodeURIComponent(searchTerm)}`;
    }
    return `?page=${pageNumber}`;
  };

  const goToPage = (pageNumber) => {
    router.push(createPageUrl(pageNumber));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="flex gap-2 mt-10 lg:mt-0 lg:bottom-32 lg:fixed">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>
      
      <button
        onClick={() => goToPage(1)}
        className={`flex items-center justify-center rounded px-3 cursor-pointer hover:bg-gray-200 ${currentPage === 1 || currentPage - 1 === 1 ? "hidden" : ""}`}
      >
        1
      </button>

      <span
        className={`flex items-center justify-center rounded px-3 text-gray-400 ${currentPage === 1 || currentPage === 2 || currentPage === 3 ? "hidden" : ""} `}
      >
        ...
      </span>

      <button
        onClick={handlePrevPage}
        className={`flex items-center justify-center rounded px-3 cursor-pointer hover:bg-gray-200 ${currentPage === 1 ? "hidden" : ""}`}
      >
        {currentPage - 1}
      </button>

      <span className="pagination-button text-white bg-blue-500 rounded px-3 flex items-center justify-center">
        {currentPage}
      </span>

      <button
        className={`flex items-center justify-center rounded px-3 cursor-pointer hover:bg-gray-200 ${currentPage + 1 === totalPages || currentPage === totalPages ? "hidden" : ""}`}
        onClick={handleNextPage}
      >
        {currentPage + 1}
      </button>

      <span
        className={`flex items-center justify-center rounded px-3 text-gray-400 ${currentPage === totalPages || currentPage === totalPages - 1 || currentPage === totalPages - 2 ? "hidden" : ""}`}
      >
        ...
      </span>

      <button
        onClick={() => goToPage(totalPages)}
        className={`flex items-center justify-center rounded px-3 cursor-pointer hover:bg-gray-200 ${currentPage === totalPages ? "hidden" : ""}`}
      >
        {totalPages}
      </button>

      <button
        onClick={handleNextPage}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
