"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const path = useParams();
  const [book, setBook] = useState([]);

  const fetchBookDetails = async () => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/books?index=${path.index}`,
      );
      const data = await res.json();
      setBook(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <img src={book.cover} alt="image" className="h-44 w-44" />
      <h1>Title : {book.title}</h1>
      <h2>Original Title : {book.originalTitle}</h2>
      <h3>Realease date : {book.releaseDate}</h3>
      <p>Description : {book.description}</p>
      <p>Pages : {book.pages}</p>
    </main>
  );
}
