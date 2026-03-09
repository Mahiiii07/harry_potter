"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Link from "next/link";
import Search from "./search";
// import { fetchFilteredData } from "./data";
import { useSearchParams } from "next/navigation";

export default function Characters({ initialCharacters, totalPages }) {
  const [characters, setCharacters] = useState(initialCharacters);
  const searchParams = useSearchParams();
  const query = searchParams?.get("search") || "";
  // const data = await fetchFilteredData(query);
  // console.log(data);

  const fetchCharacters = async (newPage) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?max=8&${query ? "query=" + query : "page=" + newPage}`,
      );
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8 ">
      <div className="flex max-sm:flex-col justify-between items-center mb-4">
        <h1 className="title">Characters</h1>
        {/* <input
          type="text"
          className="border rounded px-2 py-1 outline-none"
          autoFocus
          aria-label="search"
          placeholder="Search"
        /> */}
        <Search placeholder="Search..." />
      </div>

      <div className="card-grid">
        {characters?.map((character, i) => {
          return (
            <div
              key={i}
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
          );
        })}
      </div>

      <Pagination onPageChange={fetchCharacters} totalPages={totalPages} />
    </main>
  );
}
