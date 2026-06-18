export type TriviaQuestion = {
  id: number;
  question: string;
  possibleAnsers: string[];
  correctAnswer: string;
};

export type CharacterAPI = {
  id: number;
  name: string;
  image: string;
};
