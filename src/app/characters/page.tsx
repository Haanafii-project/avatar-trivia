"use client";

import { useEffect, useState } from "react";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterAPI } from "@/types";
import { getAvatarCharacters } from "@/services/api";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<CharacterAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAvatarCharacters()
      .then((data) => {
        setCharacters(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        Loading karakter...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "red",
          fontFamily: "sans-serif",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
          justifyItems: "center",
        }}
      >
        {characters.map((char) => {
          const cleanImageUrl = char.image.split("/revision")[0];

          return (
            <CharacterCard
              key={char.id}
              name={char.name}
              bio={`Karakter hebat dari serial Avatar bernama ${char.name}.`}
              image={cleanImageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
