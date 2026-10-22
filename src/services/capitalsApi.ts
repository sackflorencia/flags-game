import type { CountryCapital } from "../types/game";

const API_URL =
  "https://countriesnow.space/api/v0.1/countries/capital";

interface CapitalsApiResponse {
  error: boolean;
  msg: string;
  data: CountryCapital[];
}

export const getCountriesWithCapitals = async (): Promise<CountryCapital[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los países y sus capitales");
  }

  const result: CapitalsApiResponse = await response.json();

  if (result.error) {
    throw new Error(result.msg);
  }

  return result.data.filter(
    (country) => country.name.trim() && country.capital.trim()
  );
};
