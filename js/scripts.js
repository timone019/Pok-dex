let pokemonRepository = (function () {

    let pokemonList = [
        { name: "Charmander", height: 0.6, type: ["fire"], },
        { name: "Squirtle", height: 0.5, type: ["water", " shell"], },
        { name: "Pikachu", height: 0.4, type: ["electric", " speed"], },
    ];



    // IIFE wrapped around existing code: see 1st line and below

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon error");
        }
    }


    // 1.6 add function
    function addListItem(pokemon) {

        let pokemonList = document.querySelector(".pokemon-list");
        // creating li element inside ul
        let listpokemon = document.createElement("li")
        // creating button element inside li
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class")
        listpokemon.appendChild(button);
        // append button to the li listpokemon as its child
        pokemonList.appendChild(listpokemon);
        // add event listener to button with the showDetails function
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });


    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

pokemonRepository.add({ name: "Charmander", height: 0.6, types: ["fire"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

// my notes for me

 // 1.6 event handler
//  let button = document.querySelector('button');
//  button.addEventListener('click', function (event) {
//      console.log(event);
//  })

// event.target; // The element that dispatched the event, e.g., button
// event.type; // The type of the event, e.g., 'click'


// event listener
// window.addEventListener('keydown', function (event) {
//     let survey_form = document.querySelector('#survey_form');
//     let isFormHidden = survey_form.classList.contains('hidden');
//     if (!isFormHidden && event.key === 'Escape') {
//         survey_form.classList.add('hidden');
//     }
// });


// element.focus(); // Focus on this element. Mainly useful for <input> or <textarea>
// element.click(); // Click on this element
// element.blur(); // Remove focus from this element
// form.submit(); // Manually submits the form (in case form refers to a form element)

// // Form
// let form = document.querySelector('form');
// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     // Do something manually, for example, add custom validations
//     form.submit();
// });

// // events and accessibility
// document.querySelector('.show-more').addEventListener('click', function () {
//     document.querySelector('.additional-information')
//         .classList.toggle('is-visible');
// });

// retrieve the pokemonList outside of scope using the getAll function
// let myPokemonList = pokemonRepository.getAll();


// // for Each 
// myPokemonList.forEach(function (pokemon) {
//     console.log(pokemon.name + ' is ' + pokemon.height + ' ' + pokemon.type + '<br>');
//     document.write(pokemon.name + ' is ' + pokemon.height + ' ' + pokemon.type + '<br>');
// });




  // old code for let
    //     for (let i = 0; i < pokemonList.length; i++) {
    //     if (pokemonList[i].height > .5) {
    //         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "- Wow, that\'s big!" + "<br>");
    //     }
    //     else {
    //         document.write(pokemonList[i].name + "  " + "(height:" + "  " + pokemonList[i].height + " ) " + "<br>");
    //     }