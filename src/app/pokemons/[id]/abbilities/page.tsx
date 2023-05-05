'use client'

import axios from "axios";
import { useEffect, useState } from "react";


const singleAxios = (id) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/ability/${id}`)
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
                {pokemon?.effect_entries[1].effect}
            </div>
        </div>
    );
}
