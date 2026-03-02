"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharacterDetails() {
  const path = useParams();
  const [character, setCharacter] = useState([]);

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
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <img src={character.image} alt="image" className="h-44 w-44" />
      <h1>Character : {character.fullName}</h1>{" "}
      <h3>Nickname : {character.nickname}</h3>
      <p>Hogwart's House : {character.hogwartsHouse} </p>
      <p>Interpreted By : {character.interpretedBy} </p>
      {character.children && (
        <div> Children : {character.children?.join(",")} </div>
      )}
      <p>Birth Date : {character.birthdate} </p>
    </main>
  );
}
