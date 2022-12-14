import { Box, Grid } from "@mui/material";
import { Logo } from "./Logo";
import { PokemonSearch } from "./PokemonSearch";

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
        <Grid item xs={4}>
          <Logo />
        </Grid>
        <Grid item xs={8}>
          <PokemonSearch />
        </Grid>
      </Grid>
    </Box>
  );
};
