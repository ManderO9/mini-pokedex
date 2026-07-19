export interface PokemonListResponse {
    pokemon_v2_pokemon: Pokemon[];
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemontypes: PokemonType[];
    pokemon_v2_pokemonstats: PokemonStat[];
    pokemon_v2_pokemonsprites: PokemonSprites[];
}

export interface PokemonType {
    pokemon_v2_type: {
        name: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    pokemon_v2_stat: {
        name: string;
    };
}

export interface PokemonSprites {
    sprites: {
        back_shiny: string | null;
        back_female: string | null;
        front_shiny: string | null;
        back_default: string | null;
        front_female: string | null;
        front_default: string | null;
        back_shiny_female: string | null;
        front_shiny_female: string | null;
    }
}