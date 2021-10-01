const allPokemon = [];

const fetchPokemon = (numOfPokemon) => {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${numOfPokemon}/?limit=151`,
  }).then(
    (data) => {
      console.log(data);
    },
    () => {
      console.log('ERROR');
    }
  );
};
