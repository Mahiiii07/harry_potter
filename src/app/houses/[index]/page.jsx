"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HouseDetails() {
  const path = useParams();
  const [house, setHouse] = useState([]);

  const fetchHouseDetails = async () => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/houses?index=${path.index}`,
      );
      const data = await res.json();
      setHouse(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHouseDetails();
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <h1>House : {house.house}</h1>
      <span>Emoji : {house.emoji}</span>
      <h3>Founder : {house.founder}</h3>
      <p>Colors : {house.colors?.join(",")}</p>
      <p>Animal : {house.animal}</p>
    </main>
  );
}
