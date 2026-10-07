import type { Country } from "../types/game";

const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data = await response.json();
  return data.data;
};
