import { Box, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { pokemonStatBlock } from "../interfaces/pokemonStatBlock";
import Image from "mui-image";
import _ from "lodash";

export const PokemonStatBlock = () => {
  const [pokemon, setPokemon] = useState<pokemonStatBlock | undefined>(
    undefined
  );

  const fetchData = async () => {
    const pokemonFetch: Response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/662"
    );
    return pokemonFetch.json();
  };

  useEffect(() => {
    fetchData()
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch(console.error);
    console.log(pokemon);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        direction="row"
      >
        <Grid item xs={6}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
            height="75%"
            width="75%"
            fit="contain"
            duration={1500}
            easing="linear"
            showLoading={false}
            errorIcon={true}
            shift={null}
            distance="100px"
            shiftDuration={900}
            bgColor="inherit"
          />
          <Typography
            sx={{ typography: { sm: "h2", xs: "h5" } }}
            gutterBottom
            variant="h1"
          >
            {_.capitalize(pokemon?.name)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Type:{" "}
            {pokemon &&
              pokemon.types?.map((type, index) => (
                <span key={`${type}_${index}`}>
                  {" "}
                  {_.capitalize(type.type.name)}
                </span>
              ))}
          </Typography>

          {pokemon &&
            pokemon.stats?.map((stat, index) => (
              <Typography key={`${stat}_${index}`} variant="subtitle1">
                {_.capitalize(stat.stat.name)}: {stat.base_stat}
              </Typography>
            ))}
          {pokemon && (
            <Typography variant="subtitle1">
              Stat Total:{" "}
              {pokemon.stats?.reduce(
                (partialSum, a) => partialSum + a.base_stat,
                0
              )}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
