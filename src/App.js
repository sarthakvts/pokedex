import Axios from 'axios';
import { useState } from 'react';

import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: pokemonName,
    species: '',
    img: '',
    hp: '',
    attack: '',
    defence: '',
    type: ''
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name
      });
    });
  };


  return (
    <div className='App'>
      <div className='titleSection'>
        <h1>
          Pokedex
        </h1>
        <input type='text' placeholder='Enter Pokemon Name' onChange={(event) => { setPokemonName(event.target.value) }}></input>
        <button type="submit" onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className='displaySection'>

        <h2>{pokemon.name.toUpperCase()}</h2>
        <img src={pokemon.img}></img>
        <h3>Species: {pokemon.species.toUpperCase()}</h3>
        <h3>Type: {pokemon.type.toUpperCase()}</h3>
        <h3>HP: {pokemon.hp}</h3>
        <h3>Attack: {pokemon.attack}</h3>
        <h3>Defence: {pokemon.defence}</h3>

      </div>
    </div >
  )


}
export default App;
