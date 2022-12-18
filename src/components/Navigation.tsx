import { Button, Box, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useContext } from "react";
import { pokemonContext } from "../Providers/PokemonProvider";

export const Navigation = () => {
  const { currentPokemon, setCurrentPokemon } = useContext(pokemonContext);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            onClick={() => setCurrentPokemon(Math.abs(currentPokemon - 1))}
            variant="contained"
            startIcon={<ArrowBack />}
            disabled={currentPokemon <= 1}
          >
            Prev
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setCurrentPokemon(Math.abs(currentPokemon + 1))}
            variant="contained"
            disabled={currentPokemon >= 905}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
