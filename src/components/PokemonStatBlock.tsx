import { Box, Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Root } from "../interfaces/pokemonStatBlock";
import { pokemonContext } from "../Providers/PokemonProvider";
import _ from "lodash";
import { Forms } from "./Forms";
import { Stats } from "./Stats";

export const PokemonStatBlock = () => {
  const [pokemon, setPokemon] = useState<Root | undefined>(undefined);

  const { currentPokemon, setCurrentPokemon } = useContext(pokemonContext);

  const fetchData = async (pokemonToSearch: number) => {
    try {
      const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          query: `query myQuery {
            pokemon_v2_pokemon(where: {pokemon_species_id: {_eq: ${pokemonToSearch}}}) {
              pokemon_species_id
              id
              name
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
            }
          }
          
          `,
          variables: {},
        }),
      });

      if (response.ok) {
        let result = await response.json();
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(currentPokemon)
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch(console.error);
  }, [currentPokemon]);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Grid item>
            {pokemon && (
              <Forms
                pokemon_v2_pokemon={pokemon?.data.pokemon_v2_pokemon.slice(
                  0,
                  1
                )}
              />
            )}
          </Grid>
        </Grid>
        <Grid item>
          {pokemon && pokemon?.data.pokemon_v2_pokemon.length > 1 && (
            <>
              <Typography
                sx={{
                  typography: { xl: "h5", sm: "h4", xs: "h6" },
                  fontSize: { xl: "5rem", lg: "3rem", xs: "1rem" },
                  textAlign: "center",
                }}
                gutterBottom
                variant="h1"
              >
                Alternative Forms
              </Typography>
              <Divider sx={{ margin: 2, marginBottom: 4 }} variant="middle" />
              <Forms
                pokemon_v2_pokemon={pokemon?.data.pokemon_v2_pokemon.slice(1)}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
