"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Link from "next/link";

export default function Houses({ initialHouses, totalPages }) {
  const [houses, setHouses] = useState(initialHouses);

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

  return (
    <>
      <div className="card-grid">
        {houses?.map((house, i) => {
          return (
            <div key={i} className="card min-h-40">
              <h1 className="card-title">{house.house}</h1>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Emoji:</span> {house.emoji}
              </p>
              <Link href={`/houses/${house.index}`}>Details</Link>
            </div>
          );
        })}
      </div>
      <Pagination onPageChange={fetchHouses} totalPages={totalPages} />
    </>
  );
}
