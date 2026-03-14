import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const fetchPokemon = async function (pokemonName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const pokemon = await response.json();
      setPokemon(pokemon);
      console.log(pokemon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon(pokemonSearch);
  }, [pokemonSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPokemonSearch(input);
  };

  return (
    <div className="card">
      <form action="submit" onSubmit={handleSubmit} className="form">
        <label htmlFor="pokemonSearch">
          Pesquise um pokemon por nome ou id
        </label>
        <input
          id="pokemonSearch"
          placeholder="Procure algum pokemon"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit" className="btn-search">
          Buscar
        </button>
      </form>

      {pokemon?.game_indices && (
        <div className="infoBox">
          <div className="mainCard">
            <div className="pokemon-image">
              <img src={pokemon?.sprites?.front_default} alt="" />
            </div>
            <p>{pokemon?.name}</p>
          </div>

          <div className="stats">
            {pokemon.stats.map((stat) => (
              <div className="stat" key={crypto.randomUUID()}>
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-bar">
                  <div className="stat-fill"></div>
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
