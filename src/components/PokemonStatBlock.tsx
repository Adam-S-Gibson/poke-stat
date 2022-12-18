import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { pokemonStatBlock } from "../interfaces/pokemonStatBlock";
import Image from "mui-image";
import _ from "lodash";
import { pokemonContext } from "../Providers/PokemonProvider";

export const PokemonStatBlock = () => {
  const [pokemon, setPokemon] = useState<pokemonStatBlock | undefined>(
    undefined
  );

  const { currentPokemon, setCurrentPokemon } = useContext(pokemonContext);

  const fetchData = async (pokemonToSearch: number) => {
    const pokemonFetch: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonToSearch}`
    );
    return pokemonFetch.json();
  };

  useEffect(() => {
    fetchData(currentPokemon)
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch(console.error);
    console.log(pokemon);
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
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
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
            {_.capitalize(pokemon?.name)}
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
              pokemon.types?.map((type, index) => (
                <Image
                  key={`${type}_${index}`}
                  src={`https://serebii.net/pokedex-bw/type/${type.type.name}.gif`}
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
              ))}
          </Box>

          {pokemon &&
            pokemon.stats?.map((stat, index) => (
              <Typography
                key={`${stat}_${index}`}
                variant="h1"
                sx={{
                  typography: { md: "h5", sm: "body1", xs: "subtitle1" },
                  fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
                }}
              >
                {_.capitalize(stat.stat.name)}: {stat.base_stat}
              </Typography>
            ))}
          {pokemon && (
            <Typography
              variant="h1"
              sx={{
                typography: { md: "h5", sm: "body1", xs: "subtitle1" },
                fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
              }}
            >
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
