let pokemonRepository = (function () {

    let pokemonList = [
        { name: "Charmander", height: .6, type: ["fire"] },
        { name: "Squirtle", height: .5, type: ["water", " shell"] },
        { name: "Pikachu", height: .4, type: ["electric", " speed"] }
    ];



    // IIFE wrapped around existing code: see 1st line and below



    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }




    return {
        add: add,
        getAll: getAll
    };
})();


// retrieve the pokemonList outside of scope using the getAll function
let myPokemonList = pokemonRepository.getAll();


// for Each 
myPokemonList.forEach(function (pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' ' + pokemon.type + '<br>');
    document.write(pokemon.name + ' is ' + pokemon.height + ' ' + pokemon.type + '<br>');
});


// my notes for me

  // old code for let
    //     for (let i = 0; i < pokemonList.length; i++) {
    //     if (pokemonList[i].height > .5) {
    //         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "- Wow, that\'s big!" + "<br>");
    //     }
    //     else {
    //         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "<br>");
    //     }