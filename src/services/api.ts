import { TriviaQuestion } from "@/types";
import { CharacterAPI } from "@/types";

export const getTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  const apiUrl = await fetch(process.env.NEXT_PUBLIC_AVATAR_TRIVIA_API || "");

  if (!apiUrl.ok) {
    throw new Error("Gagal mengambil data trivia dari API");
  }

  return apiUrl.json();
};

export const getAvatarCharacters = async (): Promise<CharacterAPI[]> => {
  const apiUrl = await fetch(
    process.env.NEXT_PUBLIC_AVATAR_CHARACTERS_API || "",
  );

  if (!apiUrl.ok) {
    throw new Error("Gagal mengambil data kerakter dari API");
  }

  return apiUrl.json();
};
