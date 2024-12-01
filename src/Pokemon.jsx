import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";
import { Footer } from './Footer.jsx'

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=60";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search functionality
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        <img
          src="https://i.pinimg.com/originals/8a/4a/72/8a4a7213b43f4ec4f99db406be655f9e.gif"
          alt="Loading"
        />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1 className="error-msg"><i class="ri-error-warning-line"></i> Error! Could not connect to API</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header className="title">
          <h1>Pokémon</h1>
          <img
            src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif"
            alt="Poké Ball"
          />
          <h1>World</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search your favorite Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Display message if no Pokémon match the search term */}
        {searchData.length === 0 && search && (
          <div className="no-results">
            <p>No Pokémon found matching "{search}"</p>
          </div>
        )}

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>

      <Footer/>
    </>
  );
};
