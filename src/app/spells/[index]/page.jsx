"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpellDetails() {
  const path = useParams();
  const [spell, setSpell] = useState([]);

  const fetchSpellDetails = async () => {
    try {
      const res = await fetch(
        `https://potterapi-fedeperin.vercel.app/en/spells?index=${path.index}`,
      );
      const data = await res.json();
      setSpell(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSpellDetails();
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <h1>Spell : {spell.spell}</h1> <h3>Use : {spell.use}</h3>
    </main>
  );
}
