import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';


  const PokemonDetail: React.FC = () => {

    const [pokemonDetail, setPokemonDetail] = useState<any>({});
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const { name } = useParams<{ name: string }>();
    
    console.log(pokemonDetail?.types?.[0]?.type?.name);
    useEffect(() => {
      const fetchPokemonDetail = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
          setPokemonDetail(response.data);
        } catch (error) {
          console.error(`Error fetching details for ${name}:`, error);
        }
      };
  
      fetchPokemonDetail();
    }, [name]);

    const handleImageLoad = () => {
        setImageLoading(false);
      };


  return (
    <div className='pokemon-detail-container'>
      <h2>Pokémon Detail</h2>
      <div className='pokemon-detail'>
      {imageLoading && <h1>Loading...</h1>}
      <img src={pokemonDetail?.sprites?.other?.dream_world?.front_default} 
        onLoad={handleImageLoad}
        alt={pokemonDetail.name} />
      <div className='pokemon-detail-stats'>
      <h3>Name: {capitalizeFirstLetter(pokemonDetail?.name)}</h3>
      <h3>Types:</h3>
      <ul>
        {pokemonDetail.types &&
          pokemonDetail.types.map((type: any) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
      </ul>
      <h3>Abilities:</h3>
      <ul>
        {pokemonDetail.abilities &&
          pokemonDetail.abilities.map((ability: any) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
      </ul>
      </div>
      </div>
      <Link to="/pokemon">Back to Pokémon List</Link>
    </div>
  )
}

export default PokemonDetail