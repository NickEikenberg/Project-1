# Who's That Pokemon?

An app that shows the user a random pokemon, whose name they have to type in to earn points

## Live Site Link

https://nervous-raman-502e99.netlify.app/

## Process

First I created a function to fetch a pokemon from the PokeAPI. The function accepts a number, which corresponds to the ID of a pokemon. For example, you could call fetchPokemon(151) to get the data for Mew or fetchPokemon(1) to get the data for Bulbasaur

Then I created a function called playOriginal151 that uses a random number between 1 and 151 to get a random pokemon and append it to the DOM. The name of the Pokemon is saved to use as reference for the user input.

The compareUserInputToPokemonName function checks to see if the user hit the enter key. It then checks to see if their input matches the name of the current pokemon. If it does, the player is awarded their points as well as any points from the timer bonus. If the player guess wrong, they have 3 total chances before they lose.

After guessing correctly, the silhouette filter is removed to fully display the pokemon, and a setTimeout function is used to load up another pokemon 1 second later

There is also a combo counter that keeps tracking of how many correct guesses in a row the user gets. If the user gets 5 in a row, they earn 5 points on that turn instead of 1, then the combo counter is reset back to 0.

## Created With

JavaScript, JQuery, HTML, CSS, AJAX

The PokeAPI: https://pokeapi.co/
Pokemon themed text created using: https://fontmeme.com/pokemon-font/

## Known Issues

1. Bonus point timers overlap each other if the user guesses correctly quick enough

2. Holding the enter key will spam inputs and give the user a bunch of wrong answers
