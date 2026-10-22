import type { CountryCapital } from "../types/game";

import { shuffle } from "../utils/gameUtils";

export interface CapitalsQuestion {
  country: CountryCapital;
  options: string[];
}

export const generateCapitalsQuestion = (
  countries: CountryCapital[]
): CapitalsQuestion => {
  if (countries.length < 4) {
    throw new Error("Se necesitan al menos cuatro países para jugar");
  }

  const country = countries[Math.floor(Math.random() * countries.length)];

  const incorrectCapitals = shuffle(
    countries
      .filter((item) => item.name !== country.name)
      .map((item) => item.capital)
      .filter((capital) => capital !== country.capital)
  ).slice(0, 3);

  return {
    country,
    options: shuffle([country.capital, ...incorrectCapitals]),
  };
};
