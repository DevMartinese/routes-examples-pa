'use client'

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import './styles.css'

type Pokemon = { id: number; name: string; sprites: any, abbilities: any[] };

const singleAxios = (id) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        axios
            .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                setPokemon(response.data);
            })
    }, [id]);

    return { pokemon };
};

export default function PokemonDetails({ children, params }) {
    const { id } = params;
    const pokemonDetail = singleAxios(id);
    const { pokemon } = pokemonDetail;

    return (
        <>
            <div className="card-container">
                <div>
                    <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
                    <p>Name: {pokemon?.name}</p>

                    {pokemon?.abilities.map((ability, index) => {
                        return <ul key={index}><li>{ability.ability.name}</li></ul>;
                    })}
                 <Link href={`/pokemons/${id}/abbilities`}> Ver habilidades </Link>
                </div>
            </div>
            <div>
            {children}
            </div>
        </>
    );
}