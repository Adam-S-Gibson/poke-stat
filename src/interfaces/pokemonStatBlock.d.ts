export interface Root {
  data: Data
}

export interface Data {
  pokemon_v2_pokemon: PokemonV2Pokemon[]
}

export interface PokemonV2Pokemon {
  id: number
  name: string
  pokemon_v2_pokemonstats: PokemonV2Pokemonstat[]
  pokemon_v2_pokemontypes: PokemonV2Pokemontype[]
}

export interface PokemonV2Pokemonstat {
  base_stat: number
  pokemon_v2_stat: PokemonV2Stat
}

export interface PokemonV2Stat {
  name: string
}

export interface PokemonV2Pokemontype {
  pokemon_v2_type: PokemonV2Type
}

export interface PokemonV2Type {
  name: string
}
