import { Container, Grid } from "@mui/material";
import { Logo } from "./Logo";
import { PokemonSearch } from "./PokemonSearch";

export const Header = () => {
  return (
    <Container>
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
    </Container>
  );
};
