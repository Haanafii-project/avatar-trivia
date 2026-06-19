"use client";

import { useState } from "react";
import { Card, Typography, Button, Space, Progress, Modal, Result } from "antd";
import { TriviaQuestion } from "@/types";
import { useRouter } from "next/navigation";
import {
  SCORE_THRESHOLDS,
  TEXT_PATTERNS,
  SIZING,
  SPACING,
  COLORS,
  TRANSITIONS,
  TYPOGRAPHY,
} from "@/lib/constants";

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
      <Card style={{ maxWidth: SIZING.CONTAINER_MAX_WIDTH, margin: "0 auto" }}>
        Data soal kosong...
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const cleanQuestionText = currentQuestion.question
    ?.replace(TEXT_PATTERNS.QUOTE_CLEANUP, "")
    .trim();
  const cleanCorrectAnswer = currentQuestion.correctAnswer
    ?.replace(TEXT_PATTERNS.QUOTE_CLEANUP, "")
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

    if (percentage >= SCORE_THRESHOLDS.EXCELLENT) {
      return {
        status: "success" as const,
        title: "Selamat! Kamu adalah Avatar Sejati!",
        subTitle: `Skor Kamu: ${score}/${questions.length}. Penguasaan empat elemenmu sempurna, jagat raya aman bersamamu!`,
      };
    } else if (percentage >= SCORE_THRESHOLDS.GOOD) {
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
    <Card style={{ maxWidth: SIZING.CONTAINER_MAX_WIDTH, margin: "0 auto" }}>
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
            gap: SPACING.SMALL,
            width: "100%",
          }}
        >
          {currentQuestion.possibleAnsers?.map((answer, i) => {
            const cleanAnswer = answer?.replace(TEXT_PATTERNS.QUOTE_CLEANUP, "").trim();
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
                  gap: SPACING.SMALL,
                  padding: `${SPACING.SMALL} 16px`,

                  width: "100%",
                  boxSizing: "border-box",

                  border: isSelected
                    ? `2px solid ${COLORS.PRIMARY}`
                    : `1px solid ${COLORS.BORDER_DEFAULT}`,
                  borderRadius: SIZING.BORDER_RADIUS_MEDIUM,
                  backgroundColor: isSelected
                    ? COLORS.BACKGROUND_SELECTED
                    : "#ffffff",
                  cursor: "pointer",
                  transition: TRANSITIONS.SMOOTH,
                  textAlign: "left",
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: SIZING.RADIO_SIZE,
                    height: SIZING.RADIO_SIZE,
                    borderRadius: SIZING.BORDER_RADIUS_CIRCLE,
                    border: isSelected
                      ? `6px solid ${COLORS.PRIMARY}`
                      : "1px solid rgba(0,0,0,0.25)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: TYPOGRAPHY.BASE_FONT_SIZE,
                    color: isSelected ? COLORS.PRIMARY : "rgba(0,0,0,0.88)",
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
            height: SIZING.BUTTON_HEIGHT,
            fontSize: TYPOGRAPHY.BASE_FONT_SIZE,
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
                style={{ width: "100%", height: "45px", fontSize: TYPOGRAPHY.BASE_FONT_SIZE }}
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
