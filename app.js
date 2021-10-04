let userScore = 0;
let highScore = 0;
let currentCombo = 5;

$pokemonContainer = $('.pokemon-container');

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

let currentPokemonName;

const playOriginal151 = async () => {
  // Fetches a random pokemon from the original 151
  const random151 = Math.floor(Math.random() * 151 + 1);
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
    const $spinningBackground = $('.pokemon-spinning-background');
    $spinningBackground.removeClass('hidden');
    $('.input-container').removeClass('hidden');
  };
  console.log(poke.name);
  currentPokemonName = poke.name;

  displayPokemon();

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

const displayPointValue = () => {
  if (currentCombo >= 5) {
    currentCombo = 0;
    $pokemonContainer.append(
      $('<img>').attr('src', 'img/plus5.png').addClass('point-value')
    );
    setTimeout(() => {
      $('.point-value').remove();
    }, 500);
  } else {
    $pokemonContainer.append(
      $('<img>').attr('src', 'img/plus1.png').addClass('point-value')
    );
    setTimeout(() => {
      $('.point-value').remove();
    }, 500);
  }
};
const increaseScore = () => {};

const displayStartScreen = () => {
  $startScreenModal = $('.game-start-modal');
  $startScreenModal.removeClass('hidden');
};
displayStartScreen();

const compareUserInputToPokemonName = () => {
  $('#user-input').on('keydown', (event) => {
    if (event.code === 'Enter') {
      const userInput = $('#user-input').val();
      $('#user-input').val('');
      console.log(userInput);
      console.log(`Pokemon name: ${currentPokemonName}`);
      displayPointValue();
      currentCombo++;
      //   $pokemonContainer.append(
      //     $('<img>').attr('src', 'img/plus1.png').addClass('point-value')
      //   );
      //   setTimeout(() => {
      //     $('.point-value').remove();
      //   }, 500);

      if (userInput === currentPokemonName) {
        userScore++;

        if (userScore >= 151) {
          console.log('You win!');
        }
      } else {
        console.log('wrong');
      }
    }
  });
};

compareUserInputToPokemonName();

$('.btn-play').on('click', () => {
  $('.game-start-modal').addClass('hidden');
  displayCountdown();
  startGame();
});
