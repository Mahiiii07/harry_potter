"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Pagination({ onPageChange, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    router.push(`?page=${currentPage}`);
    onPageChange(currentPage);
  }, [currentPage]);

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
        onClick={() => setCurrentPage(1)}
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
      <span className="pagination-button text-white bg-blue-500">
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
        onClick={() => setCurrentPage(totalPages)}
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
