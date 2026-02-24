"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharacterDetails() {
  const path = useParams();
  const [charater, setCharacter] = useState([]);
  console.log(path.index);

  const fetchCharacterDetails = async () => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/characters?index=${path.index}`,
      );
      const data = await res.json();
      setCharacter(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCharacterDetails();
  }, []);

  return (
    <div>
      <h1>Character : {charater.fullName}</h1>{" "}
      <h3>Nickname : {charater.nickname}</h3>
    </div>
  );
}
