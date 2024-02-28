import "./App.css";

function App() {
  const title = "Pokemon Team Generator";
  const getTeam = async (e) => {
    e.preventDefault();
    let result = document.getElementById("result");
    let randomNum = Math.floor(Math.random()*1302)
    console.log(randomNum)
    try {
      let team = []
      let allPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      let allFormatted = await allPokemon.json()
      let randomPokemonUrl = allFormatted.results[randomNum-1].url 
      team += randomPokemonUrl
      let randomPokemon = await fetch(randomPokemonUrl)
      let randomFormatted = await randomPokemon.json()
      let randomPokemonImg = randomFormatted.sprites.front_default
      let pokemonType = randomFormatted
      console.log(randomFormatted.types)
      console.log(randomFormatted.types.length)

      if (randomFormatted.types.length == 1) {
        let typeAName = randomFormatted.types[0].type.name
        let typeAUrl = randomFormatted.types[0].type.url
        console.log(typeAName)
        
        let allTypeA = await fetch(typeAUrl)
        let allTypeAFormatted = await allTypeA.json()
        console.log(allTypeAFormatted.pokemon)
        let randomA = Math.floor(Math.random()*allTypeAFormatted.pokemon.length)
        let pokemonAUrl = allTypeAFormatted.pokemon[randomA -1].pokemon.url
        let pokemonA = await fetch(pokemonAUrl)
        let pokemonAFormatted = await pokemonA.json()
        console.log(pokemonAFormatted)
        let pokemonAImg = pokemonAFormatted.sprites.front_default

        // let randomB = Math.floor(Math.random()*allTypeAFormatted.pokemon.length)
        // let randomC = Math.floor(Math.random()*allTypeAFormatted.pokemon.length)
        // let randomD = Math.floor(Math.random()*allTypeAFormatted.pokemon.length)
        // let randomE = Math.floor(Math.random()*allTypeAFormatted.pokemon.length)
      } else if (randomFormatted.types.length == 2) {
        let typeA = randomFormatted.types[0].type.name
        let typeB = randomFormatted.types[1].type.name
        console.log(typeA)
        console.log(typeB)
      }

      // let div = document.getElementById('result')

      // let img = document.createElement('img')
      // img.src = randomPokemonImg
      // div.appendChild(img)
      console.log('team',team)
    }
    catch(err) {
      console.log(err.message)
    }
  };

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
