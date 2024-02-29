import axios from "axios";
import { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const title = "Pokemon Team Generator";
  const randomNum = Math.floor(Math.random()*1302)
  const getTeam = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log('useEffect');
    const getPokemon = async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      console.log(response.data.results[randomNum-1].url);
      let pokeUrl = response.data.results[randomNum-1].url;
      const poke = await axios.get(pokeUrl);
      console.log(poke.data.types[0].type.name)
      const pokeName = poke.data.name;
      const pokeSprite = poke.data.sprites.front_default;
      if (poke.data.types.length == 1) {
        let typeAName = poke.data.types[0].type.name;
        let typeAUrl = poke.data.types[0].type.url;
        let pokeTypes = [
          {
            'name': typeAName,
            'url': typeAUrl
          }
        ]
      } else if (poke.data.types.length == 2) {
        let typeAName = poke.data.types[0].type.name;
        let typeAUrl = poke.data.types[0].type.url;
        let typeBName = poke.data.types[1].type.name;
        let typeBUrl = poke.data.types[1].type.url;
        let pokeTypes = [
          {
            'name': typeAName,
            'url': typeAUrl
          },
          {
            'name': typeBName,
            'url': typeBUrl
          }
        ]
      }
      setPokemon(response.data.pokemon);
    }

    getPokemon();
  }, []);

  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={(e) => getTeam(e)}>
        <button type="submit">Submit</button>
      </form>
      <div id="result">

      </div>
    </>
  );
}



export default App;
