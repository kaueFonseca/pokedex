import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const abilities = await Promise.all(
    data.abilities.map(async (ability) => {
      const abilityResponse = await fetch(ability.ability.url);
      const abilityData = await abilityResponse.json();
      const abilityDescription = abilityData.effect_entries.find(
        (entry) => entry.language.name === "en"
      );
      return {
        name: ability.ability.name,
        description: abilityDescription
          ? abilityDescription.effect
          : "No description available",
      };
    })
  );

  return {
    name: data.name,
    image: data.sprites.front_default,
    moves: data.moves.map((move) => move.move.name),
    abilities: abilities,
    types: data.types.map((type) => type.type.name),
  };
}

const Post = () => {
  const [pokemon, setPokemon] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const pokemonData = await getPokemon(id);
      setPokemon(pokemonData);
    }

    fetchData();
  }, []);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <DetailSection >
      <PokemonTitle>{pokemon.name}</PokemonTitle>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />

      <SectionTitle>Types</SectionTitle>
      <PokemonList>
        {pokemon.types.map((type, index) => (
          <PokemonListItem key={index}>{type}</PokemonListItem>
        ))}
      </PokemonList>

      <SectionTitle>Abilities</SectionTitle>
      <PokemonList>
        {pokemon.abilities.map((ability, index) => (
          <PokemonListItem key={index}>
            <strong>{ability.name}:</strong> {ability.description}
          </PokemonListItem>
        ))}
      </PokemonList>

      <SectionTitle>Moves</SectionTitle>
      <PokemonList>
        {pokemon.moves.slice(0, 10).map((move, index) => (
          <PokemonListItem key={index}>{move}</PokemonListItem>
        ))}
      </PokemonList>
    </DetailSection>
  );
};

export { Post };

// Estilos

const DetailSection = styled.section`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PokemonTitle = styled.h1`
  text-transform: capitalize;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const PokemonImage = styled.img`
  display: block;
  margin: 0 auto 20px;
  width: 200px;
  height: 200px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #007bff;
`;

const PokemonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const PokemonListItem = styled.li`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;

  &:hover {
    background-color: #e9ecef;
  }

  strong {
    text-transform: capitalize;
    font-size: 18px;
    color: #007bff;
  }
`;