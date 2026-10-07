import type { Country, MultipleChoiceQuestion } from "../types/game";
import { getRandomCountry, shuffle } from "../utils/gameUtils";

export const generateMultipleChoiceQuestion = (
  countries: Country[]
): MultipleChoiceQuestion => {
  // Elegir país correcto
  const correctCountry = getRandomCountry(countries);

  // Elegir 3 países incorrectos
  const wrongCountries = shuffle(
    countries.filter((country) => country.name !== correctCountry.name)
  ).slice(0, 3);

  // Crear y mezclar las opciones
  const options = shuffle([
    correctCountry.name,
    ...wrongCountries.map((country) => country.name),
  ]);

  // Devolver la pregunta
  return {
    country: correctCountry,
    options,
  };
};