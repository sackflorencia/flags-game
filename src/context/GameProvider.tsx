import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Country, GameMode } from "../types/game";
import { getCountries } from "../services/countriesApi";
import { generateMultipleChoiceQuestion } from "../modes/multipleChoice";

type GameStatus = "idle" | "playing" | "finished";

type AnswerFeedback = "correct" | "incorrect" | null;

interface GameContextType {
  countries: Country[];
  currentCountry: Country | null;
  options: string[];
  score: number;
  loading: boolean;
  gameMode: GameMode;

  timeLeft: number;
  gameStatus: GameStatus;
  feedback: AnswerFeedback;
  isAnswering: boolean;

  startGame: () => void;
  nextQuestion: () => void;
  submitAnswer: (answer: string) => void;
  setGameMode: (mode: GameMode) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>("multiple-choice");

  const [timeLeft, setTimeLeft] = useState(60);

  const [gameStatus, setGameStatus] =
    useState<GameStatus>("idle");

  const [feedback, setFeedback] =
    useState<AnswerFeedback>(null);

  const [isAnswering, setIsAnswering] = useState(false);

  // Traer países
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await getCountries();
        setCountries(countries);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Generar una nueva pregunta
  const nextQuestion = () => {
    if (countries.length === 0) {
      return;
    }

    switch (gameMode) {
      case "multiple-choice": {
        const question = generateMultipleChoiceQuestion(countries);

        setCurrentCountry(question.country);
        setOptions(question.options);

        break;
      }

      case "hard": {
        // TODO
        break;
      }

      case "capitals": {
        // TODO
        break;
      }
    }
  };

  // Comenzar una nueva partida
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setFeedback(null);
    setIsAnswering(false);

    nextQuestion();

    setGameStatus("playing");
  };

  // Timer
  useEffect(() => {
    if (gameStatus !== "playing") {
      return;
    }

    if (timeLeft <= 0) {
      setGameStatus("finished");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus, timeLeft]);

  // Responder pregunta
  const submitAnswer = (answer: string) => {
    if (
      !currentCountry ||
      gameStatus !== "playing" ||
      isAnswering
    ) {
      return;
    }

    const isCorrect = answer === currentCountry.name;

    setIsAnswering(true);

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }

    // Mostrar feedback durante 500ms
    setTimeout(() => {
      setFeedback(null);
      setIsAnswering(false);

      // Solo avanzar si la respuesta fue correcta
      if (isCorrect) {
        nextQuestion();
      }
    }, 500);
  };

  return (
    <GameContext.Provider
      value={{
        countries,
        currentCountry,
        options,
        score,
        loading,
        gameMode,

        timeLeft,
        gameStatus,
        feedback,
        isAnswering,

        startGame,
        nextQuestion,
        submitAnswer,
        setGameMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;