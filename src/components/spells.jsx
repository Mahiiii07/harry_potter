"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Link from "next/link";

export default function Spells({ initialSpells, totalPages }) {
  const [spells, setSpells] = useState(initialSpells);

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

  return (
    <>
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
      <Pagination onPageChange={fetchSpells} totalPages={totalPages} />
    </>
  );
}
