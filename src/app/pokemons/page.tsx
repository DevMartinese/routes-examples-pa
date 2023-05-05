'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './styles.module.css';

interface Pokemon {
  id: number;
  sprites: any;
  name: string;
  imageUrl: string;
}

function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
      const results = response.data.results;
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: { url: string; }) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );
      setPokemons(pokemonDetails);
    }
    fetchPokemons();
  }, []);

  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={styles.item}>
          <Link href={`/pokemons/${pokemon.id}`}>
            <div className={styles.imageWrapper}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.image} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;