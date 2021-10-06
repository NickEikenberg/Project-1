# Who's That Pokemon?

An app that shows the user a random pokemon, whose name they have to type in to earn points

## Live Site Link

https://nervous-raman-502e99.netlify.app/

## How It Works

First I created a function to fetch a pokemon from the PokeAPI. The function accepts a number, which corresponds to the ID of a pokemon. For example, you could call fetchPokemon(151) to get the data for Mew or fetchPokemon(1) to get the data for Bulbasaur

Then I created a function called playOriginal151 that uses a random number between 1 and 151 to get a random pokemon and append it to the DOM. The name of the Pokemon is saved to use as reference for the user input.

The user input is compared to the Pokemon name. If the name is right, the player gets a point, and a new pokemon is generated. The id of the previous pokemon is then stored in a usedNumbers array, to ensure that same pokemon doesn't get called again. If the player guesses wrong, a variable called currentWrongs is increased by 1. If that values reaches 3, the player loses.

## Created With

JavaScript, JQuery, HTML, CSS, AJAX

The PokeAPI: https://pokeapi.co/

Pokemon themed text created using: https://fontmeme.com/pokemon-font/

## Known Issues

1. Bonus point timers overlap each other if the user guesses correctly quick enough

2. Holding the enter key will spam inputs and give the user a bunch of wrong answers
