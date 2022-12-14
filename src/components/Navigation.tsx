import { Button, Box, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const Navigation = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "1rem",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        columns={16}
        spacing={2}
      >
        <Grid item xs={8}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            Prev
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button variant="contained" endIcon={<ArrowForward />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
