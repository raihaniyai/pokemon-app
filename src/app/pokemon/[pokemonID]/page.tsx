import Image from "next/image";

import Tabs from "@/components/Tabs";
import { colors } from "@/constants/colors";
import Attribute from "@/components/Attribute";
import ProgressBar from "@/components/ProgressBar";
import formatIdToThreeDigits from "@/utils/formatId";

type Props = {
  params: Promise<{
    pokemonID: number;
  }>;
};

const PokemonDetails = async ({ params }: Props) => {
  const pokemonID = (await params).pokemonID;

  return (
    <div className={`flex flex-col w-full min-h-screen overflow-hidden ${colors["green"]}`}>
      <div>
        <div className="flex justify-between p-8 items-center">
          <div>
            <div className="text-4xl font-bold mb-2">Bulbasaur</div>
            <div className="flex space-x-2 font-bold">
              <div className="bg-gray-100/30 rounded-full px-4 py-1 mb-2 text-xs">Grass</div>
              <div className="bg-gray-100/30 rounded-full px-4 py-1 mb-2 text-xs">Poison</div>
            </div>
          </div>

          <div className="font-bold text-xl">#{formatIdToThreeDigits(pokemonID)}</div>
        </div>
      </div>

      <div className="relative">
        <Image className="absolute -top-4 -right-4 opacity-30" src="/img/pokeball.png" width="220" height="220" alt="pokeball" />
      </div>

      <div className="flex justify-center z-20">
        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`} height="200" width="200" alt="img" />
      </div>

      <div className="bg-white rounded-t-4xl h-screen flex-1 text-black -mt-8 pt-14 z-10 sm:text-lg text-sm">
        <Tabs
          items={[
            {
              key: "About",
              label: "About",
              children: (
                <About />
              )
            },
            {
              key: "Base Stats",
              label: "Base Stats",
              children: (
                <BaseStats />
              )
            },
            {
              key: "Evolution",
              label: "Evolution",
              children: (
                <div>Evolution</div>
              )
            },
            {
              key: "Moves",
              label: "Moves",
              children: (
                <div>Moves</div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div className="space-y-4">
      <Attribute label="Species" value="Seed" />
      <Attribute label="Height" value="2'3.6 (0.70 cm)" />
      <Attribute label="Weight" value="15.2 lbs (6.9kg)" />
      <Attribute label="Abilities" value="Overgrow, Clorophyl" />
    </div>
  )
}

const BaseStats = () => {
  return (
    <div className="space-y-4">
      <Attribute label="HP" value={<ProgressBar progress={45} showNumber />} />
      <Attribute label="Attack" value={<ProgressBar progress={60} showNumber />} />
      <Attribute label="Defense" value={<ProgressBar progress={48} showNumber />} />
      <Attribute label="Sp. Atk" value={<ProgressBar progress={65} showNumber />} />
      <Attribute label="Sp. Def" value={<ProgressBar progress={65} showNumber />} />
      <Attribute label="Speed" value={<ProgressBar progress={45} showNumber />} />
    </div>
  )
}

export default PokemonDetails;