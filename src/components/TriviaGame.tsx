"use client";

import { useState } from "react";
import { TriviaQuestion } from "@/types/trivia";

interface TriviaGameProps {
  questions: TriviaQuestion[];
}

export default function TriviaGame({ questions }: TriviaGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      alert("Jawaban Benar");
      setScore((prev) => prev + 1);
    } else {
      alert("Jawaban Salah");
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Harus pilih jawaban terlebih dahulu!");
      return;
    }

    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1>Hello World</h1>
        <h1>Hellow World</h1>
      </div>
    </div>
  );
}
