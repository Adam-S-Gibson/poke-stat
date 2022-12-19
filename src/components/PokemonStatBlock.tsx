import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Root } from "../interfaces/pokemonStatBlock";
import { pokemonContext } from "../Providers/PokemonProvider";
import Image from "mui-image";
import _ from "lodash";

export const PokemonStatBlock = () => {
  const [pokemon, setPokemon] = useState<Root | undefined>(undefined);

  const { currentPokemon, setCurrentPokemon } = useContext(pokemonContext);

  const fetchData = async (pokemonToSearch: number) => {
    try {
      const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          query: `query samplePokeAPIquery {\n  pokemon_v2_pokemon(where: {id: {_eq: ${pokemonToSearch}}}) {\n    id\n    name\n    pokemon_v2_pokemonstats {\n          base_stat\n          pokemon_v2_stat {\n            name\n          }\n        }\n    pokemon_v2_pokemontypes {\n      pokemon_v2_type {\n        name\n      }\n    }\n  }\n}\n`,
          variables: {},
        }),
      });

      if (response.ok) {
        let result = await response.json();
        console.log(result);
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
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          sm
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={
              pokemon !== undefined
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.data.pokemon_v2_pokemon[0].id}.png`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`
            }
            height="75%"
            width="75%"
            fit="contain"
            duration={1500}
            easing="linear"
            showLoading={true}
            errorIcon={true}
            shift={null}
            distance="100px"
            shiftDuration={900}
            bgColor="inherit"
          />
          <Typography
            sx={{
              typography: { xl: "h5", sm: "h4", xs: "h6" },
              fontSize: { xl: "5rem", lg: "3rem", xs: "1rem" },
            }}
            gutterBottom
            variant="h1"
          >
            {_.capitalize(pokemon?.data.pokemon_v2_pokemon[0].name)}
          </Typography>
        </Grid>
        <Grid item sm>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                typography: { md: "h5", sm: "body1", xs: "subtitle1" },
                fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
              }}
            >
              Type:{" "}
            </Typography>
            {pokemon &&
              pokemon.data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes?.map(
                (type, index) => (
                  <Image
                    key={`${type}_${index}`}
                    src={`https://serebii.net/pokedex-bw/type/${type.pokemon_v2_type.name}.gif`}
                    alt="Pokemon Type"
                    width={"3em"}
                    fit="contain"
                    duration={1500}
                    easing="linear"
                    showLoading={true}
                    errorIcon={true}
                    shift={null}
                    distance="100px"
                    shiftDuration={900}
                    bgColor="inherit"
                  />
                )
              )}
          </Box>

          {pokemon &&
            pokemon.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats?.map(
              (stat, index) => (
                <Typography
                  key={`${stat}_${index}`}
                  variant="h1"
                  sx={{
                    typography: { md: "h5", sm: "body1", xs: "subtitle1" },
                    fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
                  }}
                >
                  {_.capitalize(stat.pokemon_v2_stat.name)}: {stat.base_stat}
                </Typography>
              )
            )}
          {pokemon && (
            <Typography
              variant="h1"
              sx={{
                typography: { md: "h5", sm: "body1", xs: "subtitle1" },
                fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
              }}
            >
              Stat Total:{" "}
              {pokemon.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats?.reduce(
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
