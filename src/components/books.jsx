"use client";

import { useState } from "react";
import Pagination from "./pagination";
import Link from "next/link";

export default function Books({ initialBooks, totalPages }) {
  const [books, setBooks] = useState(initialBooks);

  const fetchBooks = async (newPage) => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/books?max=8&page=${newPage}`,
      );
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card-grid">
        {books?.map((book, i) => {
          return (
            <div
              key={i}
              className="card min-h-40 flex flex-col justify-betweens"
            >
              <h1 className="card-title">{book.title}</h1>
              <p className="text-gray-600 mb-8">
                <span className="font-medium">Release Date:</span>{" "}
                {book.releaseDate}
              </p>
              <Link
                href={`/books/${book.index}`}
                className="bg-purple-700 rounded-xl p-2 text-center w-full mt-auto"
              >
                Details
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination onPageChange={fetchBooks} totalPages={totalPages} />
    </>
  );
}
