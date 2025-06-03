'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import PokemonCard from "@/components/PokemonCard";
import toUpperCase from "@/utils/toUpperCase";
import { Pokemon, PokemonType } from "@/types/pokemon";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(1);
  const isLoading = useRef(false);

  const fetchPokemonBatch = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const newPokemons: Pokemon[] = [];
    for (let i = offset; i < offset + 10; i++) {
      const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`),
      ]);

      const pokemonData = await pokemonRes.json();
      const speciesData = await speciesRes.json();

      newPokemons.push({
        id: pokemonData.id,
        name: toUpperCase(pokemonData.name),
        color: speciesData.color.name,
        image: pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default,
        types: pokemonData.types.map((t: PokemonType) => t.type.name),
      });
    }

    setPokemonList((prev) => [...prev, ...newPokemons]);
    setOffset((prev) => prev + 10);
    isLoading.current = false;
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading.current) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPokemonBatch();
      }
    });

    if (node) observer.current.observe(node);
  }, [offset, fetchPokemonBatch]);

  useEffect(() => {
    fetchPokemonBatch();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white p-8 overflow-hidden">
      <div className="relative">
        <Image
          className="absolute -top-48 -right-34 filter grayscale brightness-95"
          src="/img/pokeball.png"
          width={300}
          height={300}
          alt="pokeball"
        />
      </div>
      <div className="w-full text-black">
        <div className="w-full">
          <div className="mb-10 sm:text-4xl text-3xl font-bold">Pokedex</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6 gap-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                color={pokemon.color}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}
          </div>

          <div ref={lastElementRef} className="h-10 w-full mt-10 flex justify-center items-center text-gray-500">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;