"use client";

import { useState, useEffect } from "react";
import { Card, Typography, Button, Space, Progress, Modal, Result } from "antd";

import { TriviaQuestion } from "@/types/trivia";

const { Title, Text } = Typography;

interface TriviaGameProps {
  questions: TriviaQuestion[];
}

export const TriviaGame = ({ questions }: TriviaGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <Card style={{ maxWidth: 800, margin: "0 auto" }}>
        Data soal kosong...
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const cleanQuestionText = currentQuestion.question
    ?.replace(/^"|"$/g, "")
    .trim();
  const cleanCorrectAnswer = currentQuestion.correctAnswer
    ?.replace(/^"|"$/g, "")
    .trim();

  const handleNext = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === cleanCorrectAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("selectedAnswer changed:", selectedAnswer);
  }, [selectedAnswer]);

  const handleModalOk = () => {
    setIsModalOpen(false);
    setSelectedAnswer(null); // Reset untuk soal berikutnya

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Game Selesai! Skor kamu: ${score}/${questions.length}`);
    }
  };

  return (
    <Card style={{ maxWidth: 800, margin: "0 auto" }}>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={3}>Avatar Trivia</Title>
          <Text>
            Soal {currentIndex + 1} dari {questions.length}
          </Text>
          <Progress percent={progress} showInfo={false} />
        </div>

        <Title level={4}>{cleanQuestionText}</Title>

        {/* LIST JAWABAN PAKAI TAG HTML MURNI YANG DI-STYLING (ANTI REWEL) */}
        {/* LIST JAWABAN YANG SUDAH DI-FIX AGAR STATE LANGSUNG TERISI */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          {currentQuestion.possibleAnsers?.map((answer, i) => {
            const cleanAnswer = answer?.replace(/^"|"$/g, "").trim();
            const isSelected = selectedAnswer === cleanAnswer;

            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedAnswer(cleanAnswer)}
                onMouseDown={() => setSelectedAnswer(cleanAnswer)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setSelectedAnswer(cleanAnswer);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  width: "100%",
                  border: isSelected
                    ? "2px solid #1677ff"
                    : "1px solid #d9d9d9",
                  borderRadius: "8px",
                  backgroundColor: isSelected ? "#e6f4ff" : "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: isSelected
                      ? "6px solid #1677ff"
                      : "1px solid rgba(0,0,0,0.25)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    color: isSelected ? "#1677ff" : "rgba(0,0,0,0.88)",
                    fontWeight: isSelected ? 500 : 400,
                  }}
                >
                  {cleanAnswer}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ width: "100%", textAlign: "left" }}>
          <Text type="secondary">
            Pilihan saat ini: {selectedAnswer ?? "—"}
          </Text>
        </div>

        {/* BUTTON MURNI SUPAYA SYNC DENGAN STATE JAWABAN */}
        {/* GANTI TOMBOL LAMA KAMU DENGAN INI */}
        <Button
          type="primary"
          onClick={handleNext}
          disabled={!selectedAnswer} // Menggunakan logika asli yang simpel
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
          }}
        >
          Selanjutnya
        </Button>

        <Modal
          open={isModalOpen}
          onOk={handleModalOk}
          closable={false}
          cancelButtonProps={{ style: { display: "none" } }}
          okText="Lanjut"
        >
          <Result
            status={isCorrect ? "success" : "error"}
            title={isCorrect ? "Jawaban Benar!" : "Jawaban Salah!"}
            subTitle={
              isCorrect
                ? "Mantap!"
                : `Jawaban yang benar adalah: ${cleanCorrectAnswer}`
            }
          />
        </Modal>
      </Space>
    </Card>
  );
};
