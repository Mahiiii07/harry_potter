"use client";

import Link from "next/link";
import { useState } from "react";
import Pagination from "./pagination";
import Search from "./search";
import { useRouter } from "next/navigation";

export default function Spells({ initialSpells, initialTotalPages }) {
  const [spells, setSpells] = useState(initialSpells);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchSpells = async (newPage) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/spells?max=8&page=${newPage}`,
      );
      const data = await res.json();
      setSpells(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);

    if (trimmedSearchTerm !== "") {
      router.push(`?page=1`);
      handleSearchSpells(trimmedSearchTerm);
    } else {
      router.push(`?page=1`);
      setTotalPages(initialTotalPages);
      fetchSpells(1);
    }
  };

  const handleSearchSpells = async (term, page = 1) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/spells?search=${term}`,
      );
      const allData = await res.json();
      const searchTotalPages = Math.ceil(allData.length / 8);
      setTotalPages(searchTotalPages);
      const start = (page - 1) * 8;
      const end = start + 8;
      setSpells(allData.slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    if (searchTerm) {
      handleSearchSpells(searchTerm, page);
    } else {
      fetchSpells(page);
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8 ">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Spells</h1>
        <Search placeholder="Search Spells..." onSearch={handleSearch} />
      </div>

      <div className="card-grid">
        {spells?.map((spell, i) => {
          return (
            <div
              key={i}
              className="card min-h-40 flex flex-col justify-between"
            >
              <div>
                <h1 className="card-title truncate">{spell.spell}</h1>
                <p className="text-gray-600 mb-8 truncate">
                  <span className="font-medium">Use:</span> {spell.use}
                </p>
              </div>
              <Link
                href={`/spells/${spell.index}`}
                className="bg-blue-500 rounded-xl p-2 text-center w-full "
              >
                Details
              </Link>
            </div>
          );
        })}
      </div>

      {spells.length === 0 ? (
        <p className="text-gray-600 text-center ">No characters found.</p>
      ) : (
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} />
      )}
    </main>
  );
}
