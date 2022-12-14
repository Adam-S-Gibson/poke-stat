import { Button, Container, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const Navigation = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            Prev
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" startIcon={<ArrowForward />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
