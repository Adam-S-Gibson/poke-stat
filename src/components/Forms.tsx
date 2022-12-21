import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import Image from "mui-image";
import { Data } from "../interfaces/pokemonStatBlock";
import { Stats } from "./Stats";

export const Forms = ({ pokemon_v2_pokemon }: Data) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Grid
        container
        spacing={3}
        gap={4}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {pokemon_v2_pokemon.map((form, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
            }}
            key={`${form.id}_${index}`}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${form.id}.png`}
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
                {_.capitalize(form.name)}
              </Typography>
            </Grid>
            <Grid item>
              {pokemon_v2_pokemon && (
                <Stats
                  pokemon_v2_pokemonstats={form.pokemon_v2_pokemonstats}
                  pokemon_v2_pokemontypes={form.pokemon_v2_pokemontypes}
                />
              )}
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
