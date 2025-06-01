import Image from "next/image";
import PokemonCard from "@/components/PokemonCard";

const Home = () => {
  return (
    <div className="sm:w-lg w-full min-h-screen bg-white p-8 overflow-hidden">
      <div className="relative">
        <Image className="absolute -top-48 -right-34 filter grayscale brightness-95" src="/img/pokeball.png" width="300" height="300" alt="pokeball" />
      </div>
      <div className=" w-full text-black">
        <div className="min-w-full">
          <div className="mb-10 sm:text-4xl text-3xl font-bold">Pokedex</div>

          <div className="grid grid-cols-2 gap-4">
            <PokemonCard id={1} name="Bulbasaur" color="green" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={2} name="Bulbasaur" color="green" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={3} name="Bulbasaur" color="green" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={4} name="Bulbasaur" color="red" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg" types={["Type1"]} />
            <PokemonCard id={5} name="Bulbasaur" color="red" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={6} name="Bulbasaur" color="red" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={7} name="Bulbasaur" color="blue" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg" types={["Type1", "Type2"]} />
            <PokemonCard id={8} name="Bulbasaur" color="blue" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg" types={["Type1", "Type2"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;