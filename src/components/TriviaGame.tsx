"use client";

import { useState } from "react";
import { TriviaQuestion } from "@/types/trivia";
import { Card, Space, Button } from "antd";

interface TriviaGameProps {
  questions: TriviaQuestion[];
}

export const TriviaGame = ({ questions }: TriviaGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <Card title="Avatar Trivia">
      <Space orientation="vertical">
        <Button type="primary">Mulai Quiz</Button>
      </Space>
    </Card>
  );
};
