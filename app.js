class Pokemon {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }
}

const fetchPokemon = async (numOfPokemon) => {
  const pokemon = await $.ajax(
    `https://pokeapi.co/api/v2/pokemon/${numOfPokemon}`
  ).then((data) => data);

  return pokemon;

  //   $.ajax({
  //     url: `https://pokeapi.co/api/v2/pokemon/${numOfPokemon}`,
  //     type: 'GET',
  //   }).then(
  //     (data) => {

  //       return data;
  //     },
  //     () => {
  //       console.log('ERROR');
  //     }
  //   );
};

(async function () {
  // Fetches a random pokemon from the original 151
  const random151 = Math.floor(Math.random() * 151);
  const currentPokemon = await fetchPokemon(random151);

  // Saves the current pokemons name and sprite image
  const poke = new Pokemon(
    currentPokemon.name,
    currentPokemon.sprites.front_default
  );

  // Appends the image to the center of the screen
  const displayPokemon = () => {
    $('.pokemon-container').append(
      $('<img>').attr('src', poke.img).addClass('current-pokemon cover')
    );
  };

  displayPokemon();

  //   $('.pokemon-container').append(
  //     $('<img>').attr('src', poke.img).addClass('current-pokemon cover')
  //   );
  console.log(poke.name);

  const revealPokemon = (pokemon) => {
    pokemon.removeClass('cover');
  };
})();
