import { Box, Grid } from "@mui/material";
import { Header } from "./components/Header";
import { PokemonStatBlock } from "./components/PokemonStatBlock";

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1, margin: "auto", maxWidth: "70%" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <PokemonStatBlock />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
