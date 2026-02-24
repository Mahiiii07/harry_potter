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
    <div>
      <h1>House : {house.house}</h1> <h3>Emoji : {house.emoji}</h3>
    </div>
  );
}
