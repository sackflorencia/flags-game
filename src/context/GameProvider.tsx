import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Country, GameMode } from "../types/game";
import { getCountries } from "../services/countriesApi";
import { generateMultipleChoiceQuestion } from "../modes/multipleChoice";
import { getRandomCountry } from "../utils/gameUtils";
import type { CountryCapital } from "../types/game";
import { getCountriesWithCapitals } from "../services/capitalsApi";
import { generateCapitalsQuestion } from "../modes/capitals";

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

  countriesWithCapitals: CountryCapital[];
  currentCapitalCountry: CountryCapital | null;

  startGame: () => void;
  nextQuestion: () => void;
  submitAnswer: (answer: string) => void;
  setGameMode: (mode: GameMode) => void;
  skipQuestion: () => void;
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
  const [countriesWithCapitals, setCountriesWithCapitals] =
    useState<CountryCapital[]>([]);

  const [currentCapitalCountry, setCurrentCapitalCountry] =
    useState<CountryCapital | null>(null);

  const [gameStatus, setGameStatus] =
    useState<GameStatus>("idle");

  const [feedback, setFeedback] =
    useState<AnswerFeedback>(null);

  const [isAnswering, setIsAnswering] = useState(false);
  const skipQuestion = () => {
    if (gameStatus !== "playing" || isAnswering || !currentCountry) {
      return;
    }

    setScore((previousScore) => Math.max(0, previousScore - 1));
    nextQuestion();
  };

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

  useEffect(() => {
    const loadCapitals = async () => {
      try {
        const countries = await getCountriesWithCapitals();
        setCountriesWithCapitals(countries);
      } catch (error) {
        console.error(error);
      }
    };

    loadCapitals();
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

        setCurrentCapitalCountry(null);
        break;
      }

      case "hard": {
        const country = getRandomCountry(countries);

        setCurrentCountry(country);
        setOptions([]);
        setCurrentCapitalCountry(null);

        break;
      }

      case "capitals": {
        if (countriesWithCapitals.length < 4) return;

        const question = generateCapitalsQuestion(countriesWithCapitals);

        setCurrentCapitalCountry(question.country);
        setOptions(question.options);

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

    const normalizeAnswer = (value: string) =>
      value.trim().toLocaleLowerCase();

    const correctAnswer =
      gameMode === "capitals"
        ? currentCapitalCountry?.capital
        : currentCountry?.name;

    if (!correctAnswer) return;

    const isCorrect =
      normalizeAnswer(answer) === normalizeAnswer(correctAnswer);

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

        countriesWithCapitals,
        currentCapitalCountry,

        startGame,
        nextQuestion,
        submitAnswer,
        setGameMode,
        skipQuestion
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;