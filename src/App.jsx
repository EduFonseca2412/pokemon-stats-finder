import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [barType, setBarType] = useState(null);
  const fetchPokemon = async function (pokemonName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const pokemon = await response.json();
      setPokemon(pokemon);
      setBarType(pokemon.types[0].type.name);
      console.log(barType);
      console.log(pokemon);
    } catch (error) {
      console.log("oops we did not find that pokemon!");
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
    <div className="card-border">
      <section className="pokedex-card">
        <form className="search-area" action="submit" onSubmit={handleSubmit}>
          <h1>Pesquise um pokémon por nome ou id</h1>
          <input
            type="text"
            placeholder="charmander"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {pokemon?.game_indices && (
          <div className="content">
            <div className="pokemon-side">
              <div className="image-ring">
                <div className="image-core">
                  <img
                    src={pokemon?.sprites?.front_default}
                    alt="pokemon image"
                  />
                </div>
              </div>

              <div className="pokemon-meta">
                <span className="pokemon-name">{pokemon.name}</span>
                {pokemon.types.map((slot) => (
                  <span
                    key={crypto.randomUUID()}
                    className={"type-badge " + `${slot.type.name}`}
                  >
                    {slot.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="stats">
              {pokemon.stats.map((stat) => (
                <div className="stat" key={crypto.randomUUID()}>
                  <span>{stat.stat.name}</span>
                  <div className="bar">
                    <div
                      className={`fill ${barType}`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <strong>{stat.base_stat}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
