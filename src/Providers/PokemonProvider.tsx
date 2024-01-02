import { createContext } from "react";

export const PokemonContext = createContext({
  currentPokemon: 1,
  max: 1000,
  setCurrentPokemon: (currentPokemon: number) => {},
  setMax: (max: number) => {},
});
