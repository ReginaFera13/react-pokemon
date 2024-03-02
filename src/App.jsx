import axios from "axios";
import { useState, useEffect } from 'react';
import "./App.css";
import Poke from './Poke';

function App() {
  const [pokemon, setPokemon] = useState([]);

  const title = "Pokemon Team Generator";
  const randomNum = Math.floor(Math.random()*1302)
  

  const getTeam = async (e) => {
    e.preventDefault();
    const pokemonA = await getRandomPokemon();
    const pokemonB = await getPokemon(pokemonA);
    const pokemonC = await getPokemon(pokemonA);
    const pokemonD = await getPokemon(pokemonA);
    const pokemonE = await getPokemon(pokemonA);
    const pokemonF = await getPokemon(pokemonA);
    console.log(pokemonA, pokemonB, pokemonC, pokemonD, pokemonE, pokemonF)
    setPokemon([pokemonA, pokemonB, pokemonC, pokemonD, pokemonE, pokemonF])
    // Logic to display or manipulate the generated team
  };

  const getRandomPokemon = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const pokeUrl = response.data.results[randomNum-1].url;
    const pokeResponse = await axios.get(pokeUrl);
    // const pokeResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
    const pokeData = pokeResponse.data;
    const pokemonA = await formatPokemon(pokeData)
    console.log('pokemonA', pokemonA)
    return pokemonA
  };

  

  const getPokemon = async (pokemonA) => {
    const randomNum2 = Math.floor(Math.random()*2)
    console.log('randomNum2', randomNum2)
    console.log("THIS ONE", pokemonA.types.typeB.name)
    // console.log(Object.keys(pokemonA.types).length)
    if (pokemonA.types.typeB.name == false) {
      const typeA = pokemonA.types.typeA.url
      const response = await axios.get(typeA);
      const len = response.data.pokemon.length
      const randomNum3 = Math.floor(Math.random()*len)
      console.log('randomNum3', randomNum3)
      const pokeUrl = response.data.pokemon[randomNum3-1].pokemon.url;
      // console.log('pokeUrl', response.data.pokemon[randomNum3-1].pokemon.url)
      const pokeResponse = await axios.get(pokeUrl);
      const pokeData = pokeResponse.data;
      console.log(pokeData)
      const pokemon = await formatPokemon(pokeData)
      console.log('poke teammate', pokemon)
      return pokemon
    } 
    else {
      // console.log('pokemonA', pokemonA.types.typeA.url)
      // console.log('pokemonA', pokemonA.types.typeB.url)
      const typeA = pokemonA.types.typeA.url
      const typeB = pokemonA.types.typeB.url
      if (randomNum2 == 0) {
        const response = await axios.get(typeA);
        const len = response.data.pokemon.length
        const randomNum3 = Math.floor(Math.random()*len)
        console.log('randomNum3', randomNum3)
        const pokeUrl = response.data.pokemon[randomNum3-1].pokemon.url;
        // console.log('pokeUrl', response.data.pokemon[randomNum3-1].pokemon.url)
        const pokeResponse = await axios.get(pokeUrl);
        const pokeData = pokeResponse.data;
        console.log(pokeData)
        const pokemon = await formatPokemon(pokeData)
        console.log('poke teammate', pokemon)
        return pokemon
      }
      else if (randomNum2 == 1) {
        const response = await axios.get(typeB);
        const len = response.data.pokemon.length
        const randomNum3 = Math.floor(Math.random()*len)
        console.log('randomNum3', randomNum3)
        const pokeUrl = response.data.pokemon[randomNum3-1].pokemon.url;
        // console.log('pokeUrl', response.data.pokemon[randomNum3-1].pokemon.url)
        const pokeResponse = await axios.get(pokeUrl);
        const pokeData = pokeResponse.data;
        console.log(pokeData)
        const pokemon = await formatPokemon(pokeData)
        console.log('poke teammate', pokemon)
        return pokemon
      }
    }
    
  }

  const formatPokemon = async (pokeData) => {
    let pokemon = {
      'name': pokeData.name,
      'sprite': pokeData.sprites.front_default
    };

    if (pokeData.types.length === 1) {
      let typeAName = pokeData.types[0].type.name;
      let typeAUrl = pokeData.types[0].type.url;
      let pokeTypes = {
        'typeA': {
          'name': typeAName,
          'url': typeAUrl
        },
        'typeB': {
          'name': false,
          'url': false
        }
      };
      pokemon['types'] = pokeTypes;
    } else if (pokeData.types.length === 2) {
      let typeAName = pokeData.types[0].type.name;
      let typeAUrl = pokeData.types[0].type.url;
      let typeBName = pokeData.types[1].type.name;
      let typeBUrl = pokeData.types[1].type.url;
      let pokeTypes = {
        'typeA': {
          'name': typeAName,
          'url': typeAUrl
        },
        'typeB': {
          'name': typeBName,
          'url': typeBUrl
        }
      };
      pokemon['types'] = pokeTypes;
    }
    return pokemon
  }
  


  return (
    <>
      <div id='mainContainer'>
        <h1>{title}</h1>
        <form onSubmit={(e) => getTeam(e)}>
          <button type="submit">Get Team</button>
        </form>
        <div id="result">
          {/* Display your Pokemon team here */}
          {pokemon.map((poke, i) =>
            <Poke
              key={i}
              name={poke.name}
              typeA={poke.types.typeA.name}
              typeB={poke.types.typeB.name}
              sprite={poke.sprite}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;