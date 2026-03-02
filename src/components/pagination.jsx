"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({ onPageChange, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    router.push(`?page=${currentPage}`);
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="flex gap-4 mt-10 ">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>
      <span className="flex items-center justify-center">
        Page {currentPage}
      </span>
      <button
        onClick={handleNextPage}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <div className="px-2 py-1">Total pages : {totalPages}</div>
    </div>
  );
}
