import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Country, GameMode } from "../types/game";
import { getCountries } from "../services/countriesApi";
import { generateMultipleChoiceQuestion } from "../modes/multipleChoice";

interface GameContextType {
  countries: Country[];
  currentCountry: Country | null;
  options: string[];
  score: number;
  loading: boolean;
  gameMode: GameMode;

  nextQuestion: () => void;
  checkAnswer: (answer: string) => boolean;
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

  // Generar una pregunta cuando tenemos los países
  // o cuando cambia el modo
  useEffect(() => {
    if (countries.length > 0) {
      nextQuestion();
    }
  }, [countries, gameMode]);

  const nextQuestion = () => {
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

  const checkAnswer = (answer: string) => {
    if (!currentCountry) {
      return false;
    }

    const isCorrect = answer === currentCountry.name;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }

    return isCorrect;
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
        nextQuestion,
        checkAnswer,
        setGameMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;