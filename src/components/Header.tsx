import { Box, Grid } from "@mui/material";
import { Logo } from "./Logo";
import { PokemonSearch } from "./PokemonSearch";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <PokemonSearch />
        </Grid>
        <Grid item>
          <Navigation />
        </Grid>
      </Grid>
    </Box>
  );
};
