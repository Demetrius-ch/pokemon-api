import { useState } from "react";
import Logo from "./components/Logo/Logo";
import Pokecard from "./components/Pokecard/Pokecard";

export default function App() {
  // State
  const [pokemons, setPokemons] = useState([]);

  //Récupérer les 30 Pokémons
  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json(); // 30 first pokemon
    // Get the details
    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    });
    const pokemonDetails = await Promise.all(promises);
    setPokemons(pokemonDetails);
  };
  fetchPokemons();

  //Pour chaque pkémon, on récupère les détails

  return (
    <div>
      <Logo />

      <div>
        {/* Pokemons */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto mt-10 md:p-0 p-5">
          {pokemons.map((pokemon, index) => (
            <Pokecard key={index} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
