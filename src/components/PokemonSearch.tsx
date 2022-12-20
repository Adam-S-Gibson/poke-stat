import React, { useContext, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { pokemonContext } from "../Providers/PokemonProvider";
import _ from "lodash";

interface PokemonList {
  id: string;
  name: string;
}

export const PokemonSearch = () => {
  const { currentPokemon, setCurrentPokemon } = useContext(pokemonContext);
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly PokemonList[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: {},
          body: JSON.stringify({
            query: `query samplePokeAPIquery {
              pokemon_v2_pokemon(order_by: {pokemon_species_id: asc, id: asc}, distinct_on: pokemon_species_id) {
                name
                id
                pokemon_species_id
              }
            }
            `,
            variables: {},
          }),
        });

        if (response.ok) {
          let result = await response.json();
          result = result.data.pokemon_v2_pokemon;

          if (active) {
            setOptions([...(await result)]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Autocomplete
      id="pokemon-search-bar"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => `${option.id}: ${_.capitalize(option.name)}`}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        if (newValue) {
          setCurrentPokemon(parseInt(newValue.id));
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Pokemon..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
