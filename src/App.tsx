import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { Header } from "./components/Header";
import { PokemonStatBlock } from "./components/PokemonStatBlock";
import { pokemonContext } from "./Providers/PokemonProvider";

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<number>(1);

  return (
    <pokemonContext.Provider value={{ currentPokemon, setCurrentPokemon }}>
      <Box className="App" sx={{ flexGrow: 1, margin: "auto" }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Header />
          </Grid>
          <Grid item>
            <PokemonStatBlock />
          </Grid>
        </Grid>
      </Box>
    </pokemonContext.Provider>
  );
}

export default App;
