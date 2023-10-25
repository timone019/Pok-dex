let pokemonRepository = (function () {
    // 1.7 load list add
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // Other functions remain here
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon //&&
            //  "detailsURL" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon error");
        }
    }

    // IIFE wrapped around existing code: see 1st line and below

    function getAll() {
        return pokemonList;
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

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // 1.7 load details with promise function
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
            showModal(item)
        });
    }

    // 1.8 adding showModal function
    function showModal(item) {
        let modalContainer = document.querySelector('#modal-container');


        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name; // retrieve pokemon name

        let heightElement = document.createElement('p');
        heightElement.innerText = item.height; // retrieve pokemon height

        let imgElement = document.createElement('img');
        imgElement.src = item.imageUrl; // retrieve pokemon image

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');

        // document.querySelector('#show-modal').addEventListener('click', () => {
        //     showModal();


        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }


    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }

    });




    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList, // 1.7 loadList & loadDetails
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal, // 1.8 showModal & hideModal
        hideModal: hideModal
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded! 1.7
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
})

// 1.9 jquery add

$('input').each(function (i) {
    let inputValue = $(this).val();
    let inputName = $(this).attr('name');
    if (inputValue().length < 1) {
        console.log('Please fill out the ' + inputName + ' field')
    }
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