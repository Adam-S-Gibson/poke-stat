import { Button, Box, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { pokemonContext } from "../Providers/PokemonProvider";

interface NavigationProps {
  max: number;
}

export const Navigation = ({ max }: NavigationProps) => {
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
            disabled={currentPokemon >= max}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
