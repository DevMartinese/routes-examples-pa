'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import './styles.css'

type Pokemon = { id: number; name: string; sprites: any };

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

export default function PokemonDetails({ params }) {
    const { id } = params;
    const pokemonDetail = singleAxios(id);
    const { pokemon } = pokemonDetail;

    return (
        <div className="card-container">
            <div>
                <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
                <h2>Name: {pokemon?.name}</h2>

                {pokemon?.abilities.map((ability) => {
                    return <ul><li>{ability.ability.name}</li></ul>;
                })}
            </div>
        </div>
    );
}