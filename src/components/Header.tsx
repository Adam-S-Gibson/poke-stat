import { Box, Grid } from "@mui/material";
import { Logo } from "./Logo";
import { PokemonSearch } from "./PokemonSearch";
import { Navigation } from "./Navigation";
import { useState, useEffect } from "react";

export const Header = () => {
  const [max, setMax] = useState<number>(1000);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: {},
          body: JSON.stringify({
            query: `query samplePokeAPIquery {
              pokemon_v2_pokemon(distinct_on: pokemon_species_id, order_by: {pokemon_species_id: desc}, limit: 1) {
                pokemon_species_id
              }
            }
            `,
            variables: {},
          }),
        });

        if (response.ok) {
          let result = await response.json();
          setMax(result.data.pokemon_v2_pokemon[0].pokemon_species_id);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <PokemonSearch max={max} />
        </Grid>
        <Grid item>
          <Navigation max={max} />
        </Grid>
      </Grid>
    </Box>
  );
};
