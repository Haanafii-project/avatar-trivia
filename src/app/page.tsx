import { getTriviaQuestions } from "@/services/api";
import TriviaGame from "@/components/TriviaGame";

export default async function Home() {
  const allQuestions = await getTriviaQuestions();

  const validQuestions = allQuestions
    .filter((q) => q.question && q.possibleAnsers && q.correctAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans antialiased flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Avatar Trivia
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Uji pengetahuan elemenmu dengan standar modern
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <TriviaGame questions={validQuestions} />
      </div>
    </main>
  );
}
