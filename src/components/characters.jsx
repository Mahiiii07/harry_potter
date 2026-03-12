"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./pagination";
import Search from "./search";

export default function Characters({ initialCharacters, initialTotalPages }) {
  const [characters, setCharacters] = useState(initialCharacters);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCharacters = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?max=8&page=${page}`,
      );
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const trimmed = term.trim();
    setSearchTerm(trimmed);
    router.push("?page=1");

    if (trimmed !== "") {
      handleSearchCharacters(trimmed, 1);
    } else {
      setTotalPages(initialTotalPages);
      fetchCharacters(1);
    }
  };

  const handleSearchCharacters = async (term, page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?search=${term}`,
      );
      const allData = await res.json();
      const searchTotalPages = Math.ceil(allData.length / 8);

      const start = (page - 1) * 8;
      const end = start + 8;

      setCharacters(allData.slice(start, end));
      setTotalPages(searchTotalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (searchTerm) {
      handleSearchCharacters(searchTerm, page);
    } else {
      fetchCharacters(page);
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Characters</h1>

        <Search placeholder="Search characters..." onSearch={handleSearch} />
      </div>

      {loading && <p className="text-gray-600 text-center mb-4">Loading...</p>}
      {!loading && characters.length === 0 && (
        <p className="text-gray-600 text-center">No characters found.</p>
      )}

      {!loading && characters.length > 0 && (
        <div className="card-grid">
          {characters.map((character) => (
            <div
              key={character.index}
              className="card min-h-40 flex flex-col justify-between"
            >
              <h1 className="card-title truncate">{character.fullName}</h1>

              <p className="text-gray-600 mb-8">
                <span className="font-medium">Nickname:</span>{" "}
                {character.nickname}
              </p>

              <Link
                href={`/characters/${character.index}`}
                className="bg-blue-500 rounded-xl p-2 text-center w-full mt-auto"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {characters.length > 0 && (
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
      )}
    </main>
  );
}
