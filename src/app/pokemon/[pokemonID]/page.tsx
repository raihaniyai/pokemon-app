import Image from "next/image";

import Tabs from "@/components/Tabs";
import { colors } from "@/constants/colors";
import Attribute from "@/components/Attribute";
import ProgressBar from "@/components/ProgressBar";
import formatIdToThreeDigits from "@/utils/formatId";
import toUpperCase from "@/utils/toUpperCase";
import { convertDecimetersToFootFormat, convertDecimetersToMeters, convertHectogramsToKilograms, convertHectogramsToPounds } from "@/utils/unitConverter";
import { EvolutionLink, Genera, ParsedEvolutionLink, PokemonAbility, PokemonMove, PokemonStat, PokemonType } from "@/types/pokemon";

type Props = {
  params: Promise<{
    pokemonID: number;
  }>;
};

const PokemonDetails = async ({ params }: Props) => {
  const pokemonID = (await params).pokemonID;

  const [pokemonRes, speciesRes, evolutionRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`),
    fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonID}`),
  ]);

  if (!pokemonRes.ok || !speciesRes.ok) {
    throw new Error("Failed to fetch pokemon data");
  }

  const pokemonData = await pokemonRes.json();
  const speciesData = await speciesRes.json();
  const evolutionData = await evolutionRes.json();

  const parseEvolutionChain = (chain: EvolutionLink): ParsedEvolutionLink => ({
    url: chain.species.url,
    name: chain.species.name,
    evolvesTo: chain.evolves_to.map(parseEvolutionChain),
  });

  const evolution = parseEvolutionChain(evolutionData.chain);

  return (
    <div className={`flex flex-col w-full h-screen overflow-hidden ${colors[speciesData.color.name]}`}>
      <div>
        <div className="flex justify-between p-8 items-center">
          <div>
            <div className="text-4xl font-bold mb-2">{toUpperCase(pokemonData.name)}</div>
            <div className="flex space-x-2 font-bold">
              {pokemonData.types.map((t: PokemonType) => (
                <div key={t.type.name} className="bg-gray-100/30 rounded-full px-4 py-1 mb-2 text-xs">{toUpperCase(t.type.name)}</div>
              ))}
            </div>
          </div>

          <div className="font-bold text-xl">#{formatIdToThreeDigits(pokemonID)}</div>
        </div>
      </div>

      <div className="relative">
        <Image className="absolute -top-4 -right-4 opacity-30" src="/img/pokeball.png" width="220" height="220" alt="pokeball" />
      </div>

      <div className="flex justify-center z-20">
        <Image src={pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default} height="200" width="200" alt="img" />
      </div>

      <div className="bg-white rounded-t-4xl h-screen flex-1 text-black -mt-8 pt-14 z-10 sm:text-lg text-sm">
        <Tabs
          items={[
            {
              key: "About",
              label: "About",
              children: (
                <About
                  species={speciesData.genera.find((g: Genera) => g.language.name === "en")?.genus || ""}
                  height={pokemonData.height}
                  weight={pokemonData.weight}
                  abilities={pokemonData.abilities.map((a: PokemonAbility) => toUpperCase(a.ability.name)).join(", ")}
                />
              )
            },
            {
              key: "Base Stats",
              label: "Base Stats",
              children: (
                <BaseStats stats={pokemonData.stats} />
              )
            },
            {
              key: "Evolution",
              label: "Evolution",
              children: <Evolution chain={evolution} />,
            },
            {
              key: "Moves",
              label: "Moves",
              children: (
                <Moves moves={pokemonData.moves.map((m: PokemonMove) => ({
                  name: m.move.name,
                  method: m.version_group_details[0]?.move_learn_method.name || "unknown",
                }))} />
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

type AboutProps = {
  species: string;
  height: number;
  weight: number;
  abilities: string[];
}

const About = ({ species, height, weight, abilities }: AboutProps) => {
  return (
    <div className="space-y-4">
      <Attribute label="Species" value={species} />
      <Attribute label="Height" value={`${convertDecimetersToFootFormat(height)} (${convertDecimetersToMeters(height)} m)`} />
      <Attribute label="Weight" value={`${convertHectogramsToPounds(weight)} lbs (${convertHectogramsToKilograms(weight)} kg)`} />
      <Attribute label="Abilities" value={abilities} />
    </div>
  )
}

type BaseStatsProps = {
  stats: PokemonStat[];
};

const BaseStats = ({ stats }: BaseStatsProps) => {
  const getLabel = (name: string) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
      default:
        return name;
    }
  };

  return (
    <div className="space-y-4">
      {stats.map(({ base_stat, stat }) => (
        <Attribute
          key={stat.name}
          label={getLabel(stat.name)}
          value={<ProgressBar progress={base_stat} showNumber />}
        />
      ))}
    </div>
  );
};

type EvolutionProps = {
  chain: {
    url: string;
    name: string;
    evolvesTo: EvolutionProps["chain"][];
  };
};

const Evolution = ({ chain }: EvolutionProps) => {
  const match = chain.url.match(/\/pokemon-species\/(\d+)\//);
  const id = match ? match[1] : "";

  return (
    <div className="flex flex-col space-y-4">
      <EvolutionItem name={chain.name} id={id} />
      {chain.evolvesTo.length > 0 && (
        <div className="ml-8 border-l-2 border-gray-300 pl-4">
          {chain.evolvesTo.map((evo) => (
            <Evolution key={evo.name} chain={evo} />
          ))}
        </div>
      )}
    </div>
  );
};

const EvolutionItem = ({ name, id }: { name: string, id: string }) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  return (
    <div className="flex items-center space-x-4">
      <Image src={imgUrl} width={64} height={64} alt={name} />
      <div className="capitalize">{name}</div>
    </div>
  );
};

type MovesProps = {
  moves: { name: string; method: string }[];
};

const Moves = ({ moves }: MovesProps) => {
  return (
    <div className="space-y-2 overflow-y-scroll">
      {moves.map(({ name, method }) => (
        <div
          key={name}
          className="flex justify-between px-4 py-2 border-b border-gray-200 capitalize"
        >
          <div>{name.replace("-", " ")}</div>
          <div className="italic text-gray-500">{method.replace("-", " ")}</div>
        </div>
      ))}
    </div>
  );
};

export default PokemonDetails;