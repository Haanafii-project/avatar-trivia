"use client";

import { useState } from "react";
import { Card, Typography, Button, Space, Progress, Modal, Result } from "antd";
import { TriviaQuestion } from "@/types/trivia";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface TriviaGameProps {
  questions: TriviaQuestion[];
}

export const TriviaGame = ({ questions }: TriviaGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const router = useRouter();

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

    const isCorrect = selectedAnswer === cleanCorrectAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSummaryModalOpen(true);
    }
  };

  const handleRestartGame = () => {
    setIsSummaryModalOpen(false);
    setCurrentIndex(0);
    setScore(0);
    router.refresh();
  };

  const getEvaluationData = () => {
    const percentage = (score / questions.length) * 100;

    if (percentage >= 90) {
      return {
        status: "success" as const,
        title: "Selamat! Kamu adalah Avatar Sejati!",
        subTitle: `Skor Kamu: ${score}/${questions.length}. Penguasaan empat elemenmu sempurna, jagat raya aman bersamamu!`,
      };
    } else if (percentage >= 60) {
      return {
        status: "info" as const,
        title: "Pengendali Elemen Tangguh!",
        subTitle: `Skor Kamu: ${score}/${questions.length}. Kemampuanmu sudah hebat, sedikit lagi latihan kamu bisa menyamai Avatar Master.`,
      };
    } else {
      return {
        status: "error" as const,
        title: "Belajar Lagi di Kuil Udara",
        subTitle: `Skor Kamu: ${score}/${questions.length}. Jangan menyerah! Mintalah bimbingan Paman Iroh atau berlatihlah kembali bersama Zuko.`,
      };
    }
  };

  const evaluation = getEvaluationData();

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

                  // --- PERBAIKAN BUG LEBAR DI SINI ---
                  width: "100%",
                  boxSizing: "border-box", // Menjamin padding dihitung di dalam width, gak bakal jebol lagi

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
                {/* ... sisa kode elemen lingkaran dan teks di dalamnya tetap sama ... */}
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

        <Button
          type="primary"
          onClick={handleNext}
          disabled={!selectedAnswer}
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
          }}
        >
          {currentIndex === questions.length - 1 ? "Selesai" : "Selanjutnya"}
        </Button>

        <Modal
          open={isSummaryModalOpen}
          closable={false}
          footer={null}
          centered
        >
          <Result
            status={evaluation.status}
            title={evaluation.title}
            subTitle={evaluation.subTitle}
            extra={[
              <Button
                type="primary"
                key="restart"
                size="large"
                onClick={handleRestartGame}
                style={{ width: "100%", height: "45px", fontSize: "16px" }}
              >
                Main Lagi
              </Button>,
            ]}
          />
        </Modal>
      </Space>
    </Card>
  );
};
