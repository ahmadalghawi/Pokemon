import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface Pokemon {
    name: string;
    url: string;
    urlLocal: string
    sprites: {
      front_default: string;
    }
  }

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  

  useEffect(() => {
    
    const lastUrl = localStorage.getItem('lastPokemonListUrl');
    fetchPokemonList(lastUrl || 'https://pokeapi.co/api/v2/pokemon');
  }, []);

  const fetchPokemonList = async (url: string | null = null) => {
    try {
      const response = await axios.get(url || 'https://pokeapi.co/api/v2/pokemon');
      setPokemonList(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      localStorage.setItem('lastPokemonListUrl',url || 'https://pokeapi.co/api/v2/pokemon');
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  const handlePagination = (url: string) => {
    fetchPokemonList(url);
  };

  const handleReset = () => {
    localStorage.removeItem('lastPokemonListUrl');
    fetchPokemonList('https://pokeapi.co/api/v2/pokemon');
  };


  return (
    <>
      <div className='pokemon-container'>
      <h2>Pokemon list</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}><p>{capitalizeFirstLetter(pokemon.name)}</p>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            </Link>
          </li>
        ))}
      </ul>
      <div className='pagination-btn'>
        {prevUrl && <button onClick={() => handlePagination(prevUrl)}>Previous</button>}
        {prevUrl && <button onClick={handleReset}>Reset</button>}
        {nextUrl && <button onClick={() => handlePagination(nextUrl)}>Next</button>}
        
      </div>
      </div>
    </>
  );
};

export default PokemonList;