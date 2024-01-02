import { Main } from "@/components/AppContainer";
import { PokemonContext } from "@/Providers/PokemonProvider";
import "@/index.css";
import { useState } from "react";

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<number>(1);
  const [max, setMax] = useState<number>(1);

  return (
    <PokemonContext.Provider
      value={{ currentPokemon, setCurrentPokemon, max, setMax }}
    >
      <Main />
    </PokemonContext.Provider>
  );
}

export default App;
