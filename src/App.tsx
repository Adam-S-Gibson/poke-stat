import { Box, Grid } from "@mui/material";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { PokemonStatBlock } from "./components/PokemonStatBlock";

function App() {
  return (
    <Box
      className="App"
      sx={{ flexGrow: 1, margin: "auto", maxWidth: "1200px" }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <PokemonStatBlock />
        </Grid>
      </Grid>
      <Navigation />
    </Box>
  );
}

export default App;
