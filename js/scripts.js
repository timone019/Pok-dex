let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object') {
            //"detailsURL" in pokemon
            pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }
    // data-toggle="modal" data-target="#exampleModal"

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".list-group");
        //creating li element inside the ul
        let listpokemon = document.createElement("li");
        listpokemon.classList.add('list-group-item');
        // creating button element inside the li
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class", "btn",)
        //bootstrap class
        button.setAttribute("data-toggle", "modal")
        button.setAttribute("data-target", "#Modal")
        //append button to the li listpokemon as its child
        listpokemon.appendChild(button);
        //append the li listpokemon to the ul pokemonList as its child
        pokemonList.appendChild(listpokemon);
        //button
        listpokemon.addEventListener("click", function (event) {
            console.log("button")
            showDetails(pokemon);

        });
    }
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();

            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item)
            .then(function () {
                showModal(item)
            });
    }

    // Create modal
    function showModal(item) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let modalHeader = document.querySelector('.modal-header');

        // //Clear all existing modal content
        modalTitle.innerHTML = '';
        modalBody.innerHTML = '';
        //creating element for name in modal content
        let nameElement = document.createElement('modal-header');
        nameElement.innerText = item.name;
        //creating img in modal content
        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.setAttribute('src', item.imageUrl);
        //creating element for height in modal content
        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + item.height;
        //creating element for type in modal content
        function typeCount(item) {
            if (item.types.length === 2) {
                return item.types[0].type.name + ', ' + item.types[1].type.name;
            } else {
                return item.types[0].type.name;
            }
        }
        let typeElement = document.createElement('p');
        typeElement.innerText = 'type: ' + typeCount(item);

        //Add the new modal content
        modalTitle.appendChild(nameElement);
        modalBody.appendChild(imageElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(typeElement);

        // modalContainer.classList.add('is-visible');

        // modalContainer.addEventListener('click', (e) => {
        //   let target = e.target;
        //   if (target === modalContainer) {
        //     hideModal();
        //   }
        // });
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

    })

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();


pokemonRepository.loadList()
    .then(function () {
        //now the data is loaded!
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    })