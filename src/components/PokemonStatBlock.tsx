import { Button, Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { pokemonStatBlock } from "../interfaces/pokemonStatBlock";

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
    <Container>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
            alt=""
          />
        </Grid>

        <Grid item xs={6}>
          <Button
            onClick={() => {
              console.log(pokemon);
            }}
          >
            Click me
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
