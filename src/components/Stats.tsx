import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { Root } from "../interfaces/pokemonStatBlock";
import Image from "mui-image";

export const Stats = ({ data }: Root) => {
  return (
    <Box>
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
        {data &&
          data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes?.map(
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
      {data &&
        data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats?.map(
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
      {data && (
        <Typography
          variant="h1"
          sx={{
            typography: { md: "h5", sm: "body1", xs: "subtitle1" },
            fontSize: { xl: "4rem", lg: "2rem", xs: "1rem" },
          }}
        >
          Stat Total:{" "}
          {data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats?.reduce(
            (partialSum, a) => partialSum + a.base_stat,
            0
          )}
        </Typography>
      )}
    </Box>
  );
};
