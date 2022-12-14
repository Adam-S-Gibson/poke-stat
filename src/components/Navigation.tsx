import { Button, Box, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const Navigation = () => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            Prev
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" endIcon={<ArrowForward />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
