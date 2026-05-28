import { TriviaQuestion } from "@/types/trivia";

export const getTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  const res = await fetch("https://api.sampleapis.com/avatar/questions");

  if (!res.ok) {
    throw new Error("Gagal mengambil data trivia dari API");
  }

  return res.json();
};
