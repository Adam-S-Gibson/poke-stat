import { createContext } from "react";

export const pokemonContext = createContext({
  currentPokemon: 1,
  setCurrentPokemon: (currentPokemon: number) => {},
});
