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
            <div key={i} className="card min-h-40">
              <h1 className="card-title">{spell.spell}</h1>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Use:</span> {spell.use}
              </p>
              <Link href={`/spells/${spell.index}`}>Details</Link>
            </div>
          );
        })}
      </div>
      <Pagination onPageChange={fetchSpells} totalPages={totalPages} />
    </>
  );
}
