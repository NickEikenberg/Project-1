class Pokemon {
  constructor(name, img) {
    this.name = name.includes('nidoran-')
      ? name.split('-')[0]
      : name.includes('mr')
      ? 'mr.mime'
      : name;
    this.img = img;
  }
}

const fetchPokemon = async (numOfPokemon) => {
  const pokemon = await $.ajax(
    `https://pokeapi.co/api/v2/pokemon/${numOfPokemon}`
  ).then((data) => data);

  return pokemon;
};

const playOriginal151 = async () => {
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
  console.log(poke.name);

  // Removes the filter from the pokemon div and fully displays the current pokemon, after the player guesses
  const revealPokemon = () => {
    $('.current-pokemon').removeClass('cover');
  };
};

const startGame = () => {
  setTimeout(() => {
    playOriginal151();
  }, 3000);
};

const displayCountdown = () => {
  const $countdownContainer = $('.countdown-container');
  $countdownContainer.append($('<img>').attr('src', 'img/3.png'));
  setTimeout(() => {
    $countdownContainer.empty();
    $countdownContainer.append($('<img>').attr('src', 'img/2.png'));
    setTimeout(() => {
      $countdownContainer.empty();
      $countdownContainer.append($('<img>').attr('src', 'img/1.png'));
      setTimeout(() => {
        $countdownContainer.empty();
      }, 1000);
    }, 1000);
  }, 1000);
};

// IIFE to start the game. This runs as soon as the page is loaded
(() => {
  const displayStartScreen = () => {
    $startScreenModal = $('.game-start-modal');
    $startScreenModal.removeClass('hidden');
  };
  displayStartScreen();
})();

$('.btn-play').on('click', () => {
  $('.game-start-modal').addClass('hidden');
  displayCountdown();
  startGame();
});
