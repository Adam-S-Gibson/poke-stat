import { createContext } from "react";

export const PokemonContext = createContext({
  currentPokemon: 1,
  max: 1000,
  setCurrentPokemon: (_currentPokemon: number) => {},
  setMax: (_max: number) => {},
});
