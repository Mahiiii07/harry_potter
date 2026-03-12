"use client";

import { useState, useEffect, useRef } from "react";

export default function Search({ placeholder, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        onSearch("");
      } else {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm) {
      onSearch(searchTerm);
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
        onClick={handleOnClick}
        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
