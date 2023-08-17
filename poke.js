const pokemonListElement = document.getElementById('pokemon-list');
const pokemonDetailsElement = document.getElementById('pokemon-details');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function ObtenerPokemonPorNombre(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
      const pokemonName = data.name;
      const pokemonImage = data.sprites.front_default;
      const pokemonBackImage = data.sprites.back_default;
      const pokemonTypes = data.types.map(type => type.type.name).join(', ');
      const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(',<br> ');
      pokemonDetailsElement.innerHTML = `
        <div class="pokemon-info">
          <h2>${pokemonName}</h2>
          <img src="${pokemonImage}" alt="${pokemonName}">
          <img src="${pokemonBackImage}" alt="${pokemonName}">
        </div>
        <div class="pokemon-data">
          <p><strong>Tipo:</strong> <br> ${pokemonTypes}</p>
          <p><strong>Habilidades:</strong> <br> ${pokemonAbilities}</p>
        </div>
      `;
    })
    .catch(error => {
      pokemonDetailsElement.innerHTML = '<p>Intenta con otro.</p>';
      console.log('Error:', error);
    });
}

function handleSearch() {
  const pokemonName = searchInput.value.trim().toLowerCase();
  if (pokemonName !== '') {
    ObtenerPokemonPorNombre(pokemonName);
  }
}

searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    handleSearch();
  }
});

document.addEventListener('DOMContentLoaded', () => {
 
});

var playButton = document.getElementById('playButton');
var audio = document.getElementById('intro');

playButton.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = 'Off';
  } else {
    audio.pause();
    playButton.innerHTML = 'ON';
  }
});
