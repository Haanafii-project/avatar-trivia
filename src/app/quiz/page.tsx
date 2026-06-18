import { TriviaGame } from "@/components/TriviaGame";
import { getTriviaQuestions } from "@/services/api";
import { TriviaQuestion } from "@/types";

function shuffleQuestions(array: TriviaQuestion[]): TriviaQuestion[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function QuizPage() {
  let selectedQuestions: TriviaQuestion[] = [];
  let isError = false;

  try {
    const allQuestions = await getTriviaQuestions();
    const shuffledQuestions = shuffleQuestions(allQuestions);
    selectedQuestions = shuffledQuestions.slice(0, 10);
  } catch {
    isError = true;
  }

  if (isError) {
    return (
      <div style={{ maxWidth: 800, margin: "40px auto", textAlign: "center" }}>
        <h2>Waduh, Gagal Memuat Kuis!</h2>
        <p style={{ color: "#8c8c8c" }}>
          Ada masalah saat mengambil data dari dunia roh. Silakan coba segarkan
          halaman.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px" }}>
      <TriviaGame questions={selectedQuestions} />
    </div>
  );
}
