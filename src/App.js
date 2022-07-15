import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Axios from 'axios';
import './custom.css';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [text, setText] = useState('');
  const [hints, setHint] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadHint = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1126&offset=0');
      setHint(response.data.results);
    }
    loadHint();
  }, []);
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([0, 1, 2]);
  }
  const onHandler = (text) => {
    let matches = [];
    if (text.length) {
      matches = hints.filter(hint => {
        const regex = new RegExp(`${text}`, 'gi');
        return hint.name.match(regex)
      }
      )
    }

    setSuggestions(matches)
    setText(text)
  }
  const [pokemon, setPokemon] = useState({
    name: text,
    species: '',
    img: '',
    hp: '',
    attack: '',
    defence: '',
    type: ''
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`).then((response) => {
      setPokemon({
        name: text,
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
        <input type='text' onChange={e => onHandler(e.target.value)} value={text}
          onblur={() => { setTimeout(() => { setSuggestions([]) }, 100); }}
          placeholder='Enter Pokemon Name' ></input>
        {suggestions && suggestions.map((suggestion, i) =>
          <div key={i} className='suggestion' onClick={() => onSuggestHandler(suggestion.name)}>
            {suggestion.name}
          </div>)}
        <button type="submit" onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className='displaySection'>
        <img src={pokemon.img}></img>
        <h3>Name: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h3>HP: {pokemon.hp}</h3>
        <h3>Attack: {pokemon.attack}</h3>
        <h3>Defence: {pokemon.defence}</h3>

      </div>
    </div >
  )


}
export default App;
