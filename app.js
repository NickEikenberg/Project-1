let userScore = 0;
let highScore = 0;
let currentCombo = 0;
let currentWrongs = 0;
let currentPokemonName;
let usedNumbersArray = [];
window.localStorage.whosThatPokemonHighScore;

$pokemonContainer = $('.pokemon-container');
const $spinningBackground = $('.pokemon-spinning-background');

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
  $('.pokeball-load-container').append(
    $('<img>').attr('src', 'img/pokeball-png-45334.png')
  );
  const pokemon = await $.ajax(
    `https://pokeapi.co/api/v2/pokemon/${numOfPokemon}`
  ).then((data) => data);

  return pokemon;
};

const playOriginal151 = async () => {
  currentPokemonName = '';
  // Fetches a random pokemon from the original 151

  const getNewRandom151 = () => {
    const random151 = () => {
      let num = Math.floor(Math.random() * 151 + 1);
      if (usedNumbersArray.includes(num)) {
        random151();
      } else {
        usedNumbersArray.push(num);
      }
    };
    random151();

    return usedNumbersArray[usedNumbersArray.length - 1];
  };
  const currentPokemon = await fetchPokemon(getNewRandom151());

  // Saves the current pokemons name and sprite image
  const poke = new Pokemon(
    currentPokemon.name,
    currentPokemon.sprites.front_default
  );

  // Appends the image to the center of the screen
  const displayPokemon = () => {
    $('.pokemon-container').empty();
    $('.pokemon-container').append(
      $('<img>').attr('src', poke.img).addClass('current-pokemon cover')
    );
    $spinningBackground.removeClass('hidden');
    $('.input-container').removeClass('hidden');
  };

  currentPokemonName = poke.name;

  $('.pokeball-load-container').empty();
  displayPokemon();
  displayTimer();

  // Removes the filter from the pokemon div and fully displays the current pokemon, after the player guesses
};
const revealPokemon = () => {
  $('.current-pokemon').removeClass('cover');
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
    userScore += 4;
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

const displayBonusPoints = (number) => {
  $('.current-score').prepend(
    $('<span>').addClass('bonus-score').text(`+${number}!`)
  );

  setTimeout(() => {
    $('.bonus-score').empty();
  }, 300);
};

const increaseScore = () => {
  $('#current-score').text(userScore.toFixed(2));
};

const displayWrongX = () => {
  for (let i = 1; i <= currentWrongs; i++) {
    $('.modal-wrong-x').append(
      $('<div>')
        .addClass('x-container')
        .append($('<img>').attr('src', 'img/icon-x.png').addClass('x'))
    );
  }
  setTimeout(() => {
    $('.modal-wrong-x').empty();
  }, 1000);
};

const displayStartScreen = () => {
  $startScreenModal = $('.game-start-modal');
  $startScreenModal.removeClass('hidden');
};
displayStartScreen();

//////////////////////////////////////////////////
/////////////////
/* THIS IS WHERE MOST OF THE GAME LOGIC GOES */
////////
const compareUserInputToPokemonName = () => {
  $('#user-input').on('focus', () => {
    window.scrollTo(0, 0);
    $('body').scrollTop = 0;
  });

  $('#user-input').on('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const userInput = $('#user-input').val();
      $('#user-input').val('');
      let currentTime = Number($('#timer').text());
      console.log(currentTime);

      // If user guessed right
      if (userInput.toLowerCase() === currentPokemonName) {
        let bonusPoints = currentTime;
        userScore++;
        userScore += bonusPoints;
        currentCombo++;
        displayPointValue();
        increaseScore();
        displayBonusPoints(bonusPoints);
        revealPokemon();
        // $('#timer').empty();

        // If player wins
        if (usedNumbersArray.length >= 151) {
          setTimeout(() => {
            $('.modal-you-win').toggleClass('hidden');
            saveHighScore();
          }, 1000);
        } else {
          setTimeout(() => {
            playOriginal151();
          }, 1000);
        }

        // If user guessed wrong
      } else if (userInput !== currentPokemonName) {
        currentCombo = 0;
        currentWrongs++;

        displayWrongX();

        if (currentWrongs >= 3) {
          setTimeout(() => {
            $('.modal-you-lose').removeClass('hidden');
            $('.correct-answer').text(currentPokemonName);
            $('.input-container').addClass('hidden');
            saveHighScore();
          }, 1000);
        }
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

$('.btn-play-again').on('click', () => {
  if ($('.modal-you-lose').hasClass('hidden') === false) {
    $('.modal-you-lose').addClass('hidden');
  }

  if ($('.modal-you-win').hasClass('hidden') === false) {
    $('.modal-you-win').addClass('hidden');
  }
  gameReset();
  displayCountdown();
  startGame();
});

const gameReset = () => {
  usedNumbersArray = [];
  $spinningBackground.addClass('hidden');
  $('.pokemon-container').empty();
  userScore = 0;
  currentCombo = 0;
  currentWrongs = 0;
  $('#current-score').text(userScore);
};

const saveHighScore = () => {
  if (userScore > highScore) {
    $('#high-score').text(userScore);
    highScore = userScore;
    window.localStorage.whosThatPokemonHighScore = highScore;
  }
};

const displaySavedHighScore = () => {
  if (window.localStorage.whosThatPokemonHighScore) {
    $('#high-score').text(window.localStorage.whosThatPokemonHighScore);
  }
};
displaySavedHighScore();

const displayTimer = () => {
  let initial = 500;
  let count = initial;
  let counter;

  const timer = () => {
    if (count <= 0) {
      clearInterval(counter);
      $('#timer').empty();
      return;
    }
    count--;
    displayCount(count);
  };

  const displayCount = (count) => {
    let res = count / 100;
    $('#timer').text(res.toPrecision(count.toString().length));
  };

  clearInterval(counter);
  counter = setInterval(timer, 10);

  displayCount(initial);

  //TODO create functions to stop and reset timer
};
