"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Search({ placeholder, initialSearchTerm = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed === "") {
        router.push("?page=1");
      } else {
        router.push(`?page=1&search=${trimmed}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const executeSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === "") {
      router.push("?page=1");
    } else {
      router.push(`?page=1&search=${trimmed}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <div className="py-1 px-2 outline-none border border-grey-300 rounded text-sm flex gap-2">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        className="outline-none"
        autoFocus
      />
      <button
        onClick={executeSearch}
        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
