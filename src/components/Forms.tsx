import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import Image from "mui-image";

interface pokemonForms {
  forms: {
    name: string;
    id: number;
  }[];
}

export const Forms = ({ forms }: pokemonForms) => {
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
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {forms.map((form, index) => (
          <Grid
            item
            key={`${form.id}_${index}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
        ))}
      </Grid>
    </Box>
  );
};
