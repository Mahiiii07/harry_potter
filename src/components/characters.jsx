"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Link from "next/link";

export default function Characters({ initialCharacters, totalPages }) {
  const [characters, setCharacters] = useState(initialCharacters);

  const fetchCharacters = async (newPage) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?max=8&page=${newPage}`,
      );
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card-grid">
        {characters?.map((character, i) => {
          return (
            <div
              key={i}
              className="card min-h-40 flex flex-col justify-between"
            >
              <h1 className="card-title">{character.fullName}</h1>
              <p className="text-gray-600 mb-8">
                <span className="font-medium">Nickname:</span>{" "}
                {character.nickname}
              </p>
              <Link
                href={`/characters/${character.index}`}
                className="bg-purple-700 rounded-xl p-2 text-center w-full mt-auto"
              >
                Details
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination onPageChange={fetchCharacters} totalPages={totalPages} />
    </>
  );
}
