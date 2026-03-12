"use client";

import Link from "next/link";
import { useState } from "react";
import Pagination from "./pagination";
import Search from "./search";
import { useRouter } from "next/navigation";

export default function Houses({ initialHouses, initialTotalPages }) {
  const [houses, setHouses] = useState(initialHouses);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchHouses = async (newPage) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/houses?max=8&page=${newPage}`,
      );
      const data = await res.json();
      setHouses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);

    if (trimmedSearchTerm !== "") {
      router.push(`?page=1`);
      handleSearchHouses(trimmedSearchTerm);
    } else {
      router.push(`?page=1`);
      setTotalPages(initialTotalPages);
      fetchHouses(1);
    }
  };

  const handleSearchHouses = async (term, page = 1) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/houses?search=${term}`,
      );
      const allData = await res.json();
      const searchTotalPages = Math.ceil(allData.length / 8);
      setTotalPages(searchTotalPages);
      const start = (page - 1) * 8;
      const end = start + 8;
      setHouses(allData.slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    if (searchTerm) {
      handleSearchHouses(searchTerm, page);
    } else {
      fetchHouses(page);
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8 ">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Houses</h1>
        <Search placeholder="Search Houses..." onSearch={handleSearch} />
      </div>

      <div className="card-grid">
        {houses?.map((house, i) => {
          return (
            <div
              key={i}
              className="card min-h-40 flex flex-col justify-between"
            >
              <h1 className="card-title">{house.house}</h1>
              <p className="text-gray-600 mb-8">
                <span className="font-medium">Emoji:</span> {house.emoji}
              </p>
              <Link
                href={`/houses/${house.index}`}
                className="bg-blue-500 rounded-xl p-2 text-center w-full mt-auto"
              >
                Details
              </Link>
            </div>
          );
        })}
      </div>

      {houses.length === 0 ? (
        <p className="text-gray-600 text-center ">No characters found.</p>
      ) : (
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
      )}
    </main>
  );
}
