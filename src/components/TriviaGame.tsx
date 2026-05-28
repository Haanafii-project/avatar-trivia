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
    if (selectedAnswer) return; // Kunci biar gak bisa klik dua kali

    setSelectedAnswer(answer);

    // Munculkan alert sesuai kondisi kelulusan jawaban
    if (answer === currentQuestion.correctAnswer) {
      alert("Jawaban Benar");
      setScore((prev) => prev + 1);
    } else {
      alert("Jawaban Salah");
    }
  };

  const handleNext = () => {
    // VALIDASI: Jika user belum memilih jawaban sama sekali
    if (!selectedAnswer) {
      alert("Harus pilih jawaban terlebih dahulu!");
      return; // Stop eksekusi, jangan izinkan pindah soal
    }

    setSelectedAnswer(null); // Reset pilihan untuk soal selanjutnya

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
    <div className="relative w-full">
      {/* BOX UTAMA KUIS */}
      <div className="w-full bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Teks Pertanyaan */}
        <h2 className="text-xl md:text-2xl font-black leading-snug mb-8 min-h-[70px]">
          {currentQuestion?.question}
        </h2>

        {/* Pilihan Jawaban */}
        <div className="space-y-4 mb-8">
          {currentQuestion?.possibleAnsers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === currentQuestion.correctAnswer;

            let btnStyle =
              "bg-white hover:bg-amber-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

            if (selectedAnswer) {
              if (isCorrect) {
                btnStyle =
                  "bg-[#bbf7d0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
              } else if (isSelected) {
                btnStyle =
                  "bg-[#fecaca] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
              } else {
                btnStyle =
                  "bg-gray-100 opacity-40 shadow-none pointer-events-none";
              }
            }

            return (
              <button
                key={index}
                disabled={!!selectedAnswer}
                onClick={() => handleAnswerClick(answer)}
                className={`w-full text-left p-4 border-4 border-black font-extrabold text-base md:text-lg transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center ${btnStyle}`}
              >
                <span className="flex-shrink-0 border-2 border-black bg-[#facc15] text-xs font-black px-2.5 py-1 mr-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{answer}</span>
              </button>
            );
          })}
        </div>

        {/* FOOTER BAR (Sesuai Layout Gambar Ilustrasi Kamu) */}
        <div className="flex flex-row justify-between items-center border-t-4 border-black pt-6 gap-4">
          {/* Pojok Kiri: Nomor Pertanyaan */}
          <div className="font-black text-base md:text-lg uppercase">
            Question number {currentIndex + 1}/10
          </div>

          {/* Pojok Kanan: Tombol Next yang Selalu Standby */}
          <button
            onClick={handleNext}
            className="bg-white hover:bg-slate-50 text-black font-black py-2.5 px-5 md:px-8 uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-sm md:text-base whitespace-nowrap"
          >
            {currentIndex === questions.length - 1
              ? "Lihat Hasil Akhir"
              : "Next Question Button"}
          </button>
        </div>
      </div>

      {/* MODAL HASIL SKOR (Muncul setelah soal ke-10 selesai diklik Next) */}
      {isFinished && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center animate-in fade-in zoom-in duration-200">
            <h2 className="text-4xl font-black uppercase mb-4 tracking-tight">
              Misi Selesai!
            </h2>
            <p className="text-lg font-bold mb-6 text-gray-700">
              Kamu berhasil menyelesaikan 10 tantangan elemen.
            </p>

            <div className="bg-[#facc15] border-4 border-black p-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block w-full">
              <span className="block text-xs font-black uppercase tracking-widest text-black/60 mb-1">
                SKOR AKHIR KAMU
              </span>
              <span className="text-4xl font-black">
                {score} / {questions.length}
              </span>
            </div>

            <button
              onClick={restartGame}
              className="w-full bg-black text-white font-black py-4 uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(250,204,21,1)] transition-all"
            >
              Main Lagi ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
