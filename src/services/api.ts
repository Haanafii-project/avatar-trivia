import { TriviaQuestion } from "@/types";
import { CharacterAPI } from "@/types";

const TRIVIA_API_ENDPOINT = process.env.NEXT_PUBLIC_AVATAR_TRIVIA_API;
const CHARACTERS_API_ENDPOINT = process.env.NEXT_PUBLIC_AVATAR_CHARACTERS_API;

const requireEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  if (value.startsWith("\"") && value.endsWith("\"")) {
    throw new Error(
      `Environment variable ${key} must not include surrounding quotes. Remove the quotes from the value in .env.local.`,
    );
  }

  return value;
};

export const getTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  const apiEndpoint = requireEnv(TRIVIA_API_ENDPOINT, "NEXT_PUBLIC_AVATAR_TRIVIA_API");
  const response = await fetch(apiEndpoint);

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil data trivia dari API (${response.status} ${response.statusText})`,
    );
  }

  return response.json();
};

export const getAvatarCharacters = async (): Promise<CharacterAPI[]> => {
  const apiEndpoint = requireEnv(CHARACTERS_API_ENDPOINT, "NEXT_PUBLIC_AVATAR_CHARACTERS_API");
  const response = await fetch(apiEndpoint);

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil data karakter dari API (${response.status} ${response.statusText})`,
    );
  }

  return response.json();
};
