import React from "react";
import { getTriviaQuestions } from "@/services/api";
import TriviaGame from "@/components/TriviaGame";
import { Button, Space, Typography } from "antd";
// 1. Import type yang barusan kamu buat
import { TriviaQuestion } from "@/types/trivia";

const { Title, Paragraph } = Typography;

export default async function Home() {
  // 2. Gunakan tipe TriviaQuestion[] di sini
  let validQuestions: TriviaQuestion[] = [];

  try {
    const allQuestions = await getTriviaQuestions();

    // 3. Lakukan casting (as TriviaQuestion[]) agar TypeScript tahu tipe data dari API
    validQuestions = (allQuestions as TriviaQuestion[])
      .filter((q) => q.question && q.possibleAnsers && q.correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  } catch (error) {
    console.error("Gagal memuat pertanyaan kuis:", error);
  }

  return (
    <main className="flex flex-col p-4 md:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Avatar Trivia</h1>
        <p className="text-sm text-slate-500 mt-1">
          Uji pengetahuan elemenmu dengan standar modern
        </p>
      </div>

      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Title level={2}>Halo Ant Design! 🚀</Title>
        <Paragraph>
          Ant Design berhasil diintegrasikan dengan Next.js App Router
          menggunakan SSR Registry.
        </Paragraph>

        <Space size="middle">
          <Button type="primary">Tombol Utama</Button>
          <Button>Tombol Biasa</Button>
          <Button type="dashed">Tombol Dashed</Button>
          <Button type="primary" danger>
            Tombol Bahaya
          </Button>
        </Space>
      </div>

      <div className="w-full mt-6">
        {validQuestions.length > 0 ? (
          <TriviaGame questions={validQuestions} />
        ) : (
          <p className="text-center text-red-500">
            Gagal memuat soal kuis. Silakan coba lagi.
          </p>
        )}
      </div>
    </main>
  );
}
