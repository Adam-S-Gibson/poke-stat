import { useContext, useEffect, useState } from "react";
import { AlternativeForms } from "@/components/AlternativeForms";
import { PokemonTitleCard } from "@/components/PokemonTitleCard";
import { StatsCard } from "@/components/StatsCard";
import {
  Pokemon,
  PokemonFormAggregateResponse,
} from "@/types/pokemonDataTypes";
import { PokemonContext } from "@/Providers/PokemonProvider";

export const ContentArea = () => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [pokemonAltForms, setPokemonAltForms] = useState<Pokemon[] | undefined>(
    undefined
  );
  const [pokemonCount, setPokemonCount] = useState<
    PokemonFormAggregateResponse | undefined
  >(undefined);
  const { setMax, currentPokemon } = useContext(PokemonContext);

  const fetchData = async (pokemonToSearch: number) => {
    try {
      const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          query: `query myQuery($pokemonId: Int!) {
            pokemon: pokemon_v2_pokemonform_aggregate(where: {pokemon_v2_pokemon: {pokemon_species_id: {_eq: $pokemonId}}}) {
              forms: nodes {
                form_name
                pokemonInfo: pokemon_v2_pokemon {
                  pokemon_species_id
                  id
                  name
                  pokemonStats: pokemon_v2_pokemonstats {
                    base_stat
                    pokemonStat: pokemon_v2_stat {
                      name
                    }
                  }
                  pokemonTypes: pokemon_v2_pokemontypes {
                    pokemonType: pokemon_v2_type {
                      name
                    }
                  }
                  pokemonSprite: pokemon_v2_pokemonsprites {
                    sprites
                  }
                }
              }
            }
            pokemonCount: pokemon_v2_pokemon_aggregate {
              aggregate {
                count(columns: pokemon_species_id, distinct: true)
              }
            }
          }         
          `,

          variables: { pokemonId: pokemonToSearch },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(currentPokemon)
      .then((response) => {
        if (response && response.data.pokemon.forms.length > 0) {
          const fetchedPokemonForm = response.data.pokemon.forms[0];
          const fetchedPokemon = fetchedPokemonForm.pokemonInfo;
          setMax(response.data.pokemonCount.aggregate.count);

          const fetchedPokemonAltForms = response.data.pokemon.forms
            .filter((form: { form_name: string }) => form.form_name !== "")
            .map((form: { pokemonInfo: any; form_name: string }) => {
              const pokemonInfo = form.pokemonInfo;
              const spritesJson = pokemonInfo.pokemonSprite[0].sprites;

              const officialArtwork = spritesJson.other["official-artwork"];
              const updatedSprites = {
                ...spritesJson,
                other: {
                  ...spritesJson.other,
                  official_artwork: officialArtwork,
                },
              };

              return {
                ...pokemonInfo,
                pokemonSprite: updatedSprites,
                formName: form.form_name,
              };
            });

          setPokemonAltForms(fetchedPokemonAltForms);

          if (pokemonCount === undefined) {
            setPokemonCount(response.data.pokemonCount.aggregate.count);
          }

          if (fetchedPokemon.pokemonSprite.length > 0) {
            const spritesJson = fetchedPokemon.pokemonSprite[0].sprites;
            const officialArtwork = spritesJson.other["official-artwork"];
            const updatedSprites = {
              ...spritesJson,
              other: {
                ...spritesJson.other,
                official_artwork: officialArtwork,
              },
            };

            const updatedPokemon = {
              ...fetchedPokemon,
              pokemonSprite: updatedSprites,
            };

            setPokemon(updatedPokemon);
          }
        }
      })
      .catch(console.error);
  }, [currentPokemon]);

  return (
    <div className="w-full max-w-screen-lg">
      <main className="flex flex-col md:flex-row flex-grow gap-2">
        <div className="md:w-1/2 md:p-2">
          <PokemonTitleCard
            imageSrc={
              pokemon?.pokemonSprite.other.official_artwork.front_default ||
              "https://placehold.co/400"
            }
            pokemonName={pokemon?.name}
            pokemonTypes={pokemon?.pokemonTypes.map((type) => {
              return `https://serebii.net/pokedex-bw/type/${type.pokemonType.name}.gif`;
            })}
          ></PokemonTitleCard>
        </div>
        <div className="md:w-1/2 md:p-2">
          <StatsCard pokemon={pokemon}></StatsCard>
        </div>
      </main>
      <aside className="p-4 bg-white mt-4">
        <AlternativeForms
          images={pokemonAltForms?.map((pokemon) => {
            return {
              imageUrl:
                pokemon.pokemonSprite.other.official_artwork.front_default ||
                "https://placehold.co/400",
              imageAltText: `${pokemon.formName}`,
            };
          })}
        ></AlternativeForms>
      </aside>
    </div>
  );
};
