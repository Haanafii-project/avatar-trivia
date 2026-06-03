import { TriviaGame } from "@/components/TriviaGame";
import { getTriviaQuestions } from "@/services/api";

export default async function Home() {
  const questions = await getTriviaQuestions();

  return <TriviaGame questions={questions} />;
}
