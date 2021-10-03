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
  const random151 = Math.floor(Math.random() * 151);
  const currentPokemon = await fetchPokemon(random151);
  console.log(currentPokemon.sprites.front_default);

  const poke = new Pokemon(
    currentPokemon.name,
    currentPokemon.sprites.front_default
  );

  $('.pokemon-container').append(
    $('<img>').attr('src', poke.img).addClass('current-pokemon cover')
  );
})();
