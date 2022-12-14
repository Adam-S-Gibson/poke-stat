import { Box, Grid, Typography } from "@mui/material";
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
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item sm>
          <Image
            src={
              pokemon !== undefined
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`
            }
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
            sx={{ typography: { md: "h2", sm: "h4", xs: "h6" } }}
            gutterBottom
            variant="h1"
          >
            {_.capitalize(pokemon?.name)}
          </Typography>
        </Grid>
        <Grid item sm>
          <Typography variant="subtitle1">
            Type:{" "}
            {pokemon &&
              pokemon.types?.map((type, index) => (
                <span key={`${type}_${index}`}>
                  {" "}
                  <img
                    src={`https://serebii.net/pokedex-bw/type/${type.type.name}.gif`}
                    alt="Pokemon Type"
                  />
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
