# Who's That Pokemon?

An app that shows the user a random pokemon, whose name they have to type in to earn points

## Live Site Link

https://nervous-raman-502e99.netlify.app/

## Process

First I created a function to fetch a pokemon from the PokeAPI. The function accepts a number, which corresponds to the ID of a pokemon. For example, you could call fetchPokemon(151) to get the data for Mew or fetchPokemon(1) to get the data for Bulbasaur

Then I created a function called playOriginal151 that uses a random number between 1 and 151 to get a random pokemon and append it to the DOM. The name of the Pokemon is saved to use as reference for the user input. The
