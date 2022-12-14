import { Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { pokemonStatBlock } from "../interfaces/pokemonStatBlock";
import _ from "lodash";

export const PokemonStatBlock = () => {
  const [pokemon, setPokemon] = useState<pokemonStatBlock | undefined>(
    undefined
  );

  const fetchData = async () => {
    const pokemonFetch: Response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/1"
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
    <Container sx={{ height: "80vh" }}>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
            height={"300rem"}
            alt=""
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h1">{_.capitalize(pokemon?.name)}</Typography>
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
        </Grid>
      </Grid>
    </Container>
  );
};
