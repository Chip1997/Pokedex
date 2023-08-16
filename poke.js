const pokemonListElement = document.getElementById('pokemon-list');
const pokemonDetailsElement = document.getElementById('pokemon-details');
const url = 'https://pokeapi.co/';
// Función para obtener la lista de Pokémon desde la API
function getPokemonList() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      pokemonList.forEach(pokemon => {
        const pokemonName = pokemon.name;
        const pokemonUrl = pokemon.url;
        const pokemonElement = document.createElement('div');
        pokemonElement.textContent = pokemonName;
        pokemonElement.addEventListener('click', () => {
          getPokemonDetails(pokemonUrl);
        });
        pokemonListElement.appendChild(pokemonElement);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Función para obtener los detalles de un Pokémon específico desde la API
function getPokemonDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemonName = data.name;
      const pokemonImage = data.sprites.front_default;
      const pokemonTypes = data.types.map(type => type.type.name).join(', ');
      const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(', ');

      pokemonDetailsElement.innerHTML = `
        <h2>${pokemonName}</h2>
        <img src="${pokemonImage}" alt="${pokemonName}">
        <p><strong>Type(s):</strong> ${pokemonTypes}</p>
        <p><strong>Abilities:</strong> ${pokemonAbilities}</p>
      `;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Obtener la lista de Pokémon al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  getPokemonList();
});