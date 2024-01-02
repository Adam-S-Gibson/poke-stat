import { SVGProps, useContext, useEffect, useState } from "react";
import { PokemonContext } from "@/Providers/PokemonProvider";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const NavigationBar = () => {
  const { currentPokemon, setCurrentPokemon, max } = useContext(PokemonContext);

  return (
    <div className="p-2 w-full max-w-screen-lg">
      <div className="flex items-center justify-between bg-white rounded-md shadow-md">
        <img
          alt="Logo"
          className="h-16 w-16 mr-2 top-2 left-2"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          onClick={() => setCurrentPokemon(1)}
        />
        <div className="flex items-center">
          <button
            className="p-2 transition ease-in-out delay-150 hover:-translate-x-1 rounded-full active:bg-slate-500 hover:bg-slate-300 hover:scale-110 duration-300"
            disabled={currentPokemon === 1}
            onClick={() => {
              if (currentPokemon > 1) {
                setCurrentPokemon(currentPokemon - 1);
              }
            }}
          >
            <ArrowLeftIcon className="w-4 h-4 " />
          </button>
        </div>
        <SearchBar />
        <button
          className="p-2 mr-2 transition ease-in-out delay-150 hover:translate-x-1 hover:scale-110 duration-300 hover:bg-slate-300 active:bg-slate-500 rounded-full"
          disabled={currentPokemon === max}
          onClick={() => {
            if (currentPokemon < max) {
              setCurrentPokemon(currentPokemon + 1);
            }
          }}
        >
          <ArrowRightIcon className="w-4 h-4 " />
        </button>
      </div>
    </div>
  );
};

function ArrowLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface pokemonSearchBox {
  label: string;
  value: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchList, setSearchList] = useState<pokemonSearchBox[]>([]);
  const { max, setCurrentPokemon } = useContext(PokemonContext);

  const fetchData = async () => {
    try {
      const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          query: `query samplePokeAPIquery {
            pokemonList: pokemon_v2_pokemon(distinct_on: id, limit: ${max}) {
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
        return result.data.pokemonList;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    fetchData()
      .then((entries) => {
        const pokedexEntries = entries.map(
          (entry: { pokemon_species_id: number; name: string }) => {
            return {
              value: entry.pokemon_species_id,
              label: formatName(entry.name),
            };
          }
        );
        setSearchList(pokedexEntries);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
      });
  }, [max]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          {"Select Pokemon..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-96 max-h-96 p-0 overflow-y-scroll mx-auto">
        <Command>
          <CommandInput placeholder="Search Pokemon..." />
          <CommandEmpty>No pokemon found.</CommandEmpty>
          <CommandGroup>
            {searchList.map((pokemon) => (
              <CommandItem
                key={pokemon.value}
                value={pokemon.value}
                onSelect={() => {
                  setOpen(false);
                  setCurrentPokemon(parseInt(pokemon.value));
                }}
              >
                {pokemon.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
