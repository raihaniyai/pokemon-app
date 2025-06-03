export type Pokemon = {
  id: number;
  name: string;
  color: string;
  types: string[];
  image: string;
}

export type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonMove = {
  move: {
    name: string;
  };
  version_group_details: {
    move_learn_method: {
      name: string;
    };
  }[];
};

export type PokemonData = {
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
};

export type SpeciesData = {
  color: { name: string };
  genera: Genera[];
};

export type Genera = {
  genus: string;
  language: { name: string };
}

export type EvolutionLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionLink[];
};

export type EvolutionData = {
  chain: EvolutionLink;
};

export type ParsedEvolutionLink = {
  url: string;
  name: string;
  evolvesTo: ParsedEvolutionLink[];
};
