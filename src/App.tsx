import "./App.css";
import { Container, Grid } from "@mui/material";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { PokemonStatBlock } from "./components/PokemonStatBlock";

function App() {
  return (
    <Container className="App">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <PokemonStatBlock />
        </Grid>
        <Grid item>
          <Navigation />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
