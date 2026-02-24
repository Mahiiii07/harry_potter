"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const path = useParams();
  const [book, setBook] = useState([]);
  console.log(path.index);

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
    <div>
      <h1>Name : {book.title}</h1> <h3>Realease date : {book.releaseDate}</h3>
    </div>
  );
}
