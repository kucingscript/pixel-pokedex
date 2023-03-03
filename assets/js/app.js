const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (response.status === 200) {
    const result = await response.json();
    return result;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = "Loading...";
  pokemonNumber.textContent = "";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonNumber.textContent = data.id.toString().padStart(3, "0");
    pokemonName.textContent = data.name;
    pokemonImage.style.display = "block";
    pokemonImage.alt = data.name;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.textContent = "Not Found";
    pokemonNumber.textContent = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
