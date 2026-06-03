import { TriviaGame } from "@/components/TriviaGame";
import { TriviaQuestion } from "@/types/trivia";

const staticQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question:
      '"Long ago, the four nations lived together in harmony. Then, everything changed when ________ attacked."',
    possibleAnsers: [
      "the Water Tribes",
      "the Fire Nation",
      "the Earth Kingdom",
      "the Air Nomads",
    ],
    correctAnswer: "the Fire Nation",
  },
  {
    id: 2,
    question: "Aang becomes an airbending master at the young age of _____",
    possibleAnsers: ["12", "6", "10", "16"],
    correctAnswer: "12",
  },
  {
    id: 3,
    question: "How long is Aang frozen in ice?",
    possibleAnsers: ["50 years", "20 years", "100 years", "250 years"],
    correctAnswer: "100 years",
  },
  {
    id: 4,
    question:
      "What is the name of the Fire Nation prince tasked with finding the Avatar?",
    possibleAnsers: ["Jet", "Haru", "Zuko", "Bumi"],
    correctAnswer: "Zuko",
  },
  {
    id: 5,
    question: "Aang's flying bison is named...?",
    possibleAnsers: ["Momo", "Fang", "Appa", "Naga"],
    correctAnswer: "Appa",
  },
  {
    id: 6,
    question:
      "What is Sokka's signature weapon that he inherited from his father?",
    possibleAnsers: ["A sword", "A machete", "A katana", "A boomerang"],
    correctAnswer: "A boomerang",
  },
  {
    id: 7,
    question: "What is the name of the reigning Fire Lord?",
    possibleAnsers: ["Roku", "Ozai", "Sozin", "Azulon"],
    correctAnswer: "Ozai",
  },
  {
    id: 8,
    question: "The female warriors who fight using metal fans are the...?",
    possibleAnsers: [
      "Freedom fighters",
      "Dai Li",
      "Kyoshi warriors",
      "White Lotus",
    ],
    correctAnswer: "Kyoshi warriors",
  },
  {
    id: 9,
    question: "Aang and Katara learn waterbending from Master _____?",
    possibleAnsers: ["Pakku", "Yakone", "Arnook", "Unalaq"],
    correctAnswer: "Pakku",
  },
  {
    id: 10,
    question: "Which spirit is the guardian of the library of knowledge?",
    possibleAnsers: ["Wan", "Wan Shi Tong", "Koh", "Hei Bai"],
    correctAnswer: "Wan Shi Tong",
  },
];

export default function Home() {
  return <TriviaGame questions={staticQuestions} />;
}
