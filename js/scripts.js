let pokemonList = [
    { name: "Charmander", height: .6, type: ["fire"] },
    { name: "Squirtle", height: .5, type: ["water", " shell"] },
    { name: "Pikachu", height: .4, type: ["electric", " speed"] }
];
// old code for let 
//     for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > .5) {
//         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "- Wow, that\'s big!" + "<br>");
//     }
//     else {
//         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "<br>");
//     }

// for each 
pokemonList.forEach(function (pokemon) {
    document.write(pokemon.name + ' is ' + pokemon.height + ' ' + pokemon.type + '<br>');
});







