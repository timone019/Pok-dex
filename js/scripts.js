let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object") {
      //"detailsURL" in pokemon
      pokemonList.push(pokemon); //can sort alphabetically here
    }
  }

  // making a function that activates the search bar to be able to filter pokemon based on letters typed by user
  function createSearchBar(pokemonList) {
    const searchBarContainer = document.getElementById("searchBarContainer"); // calling searcBarContainer element 

    const searchBar = document.createElement("input");
    searchBar.type = "text"; //or("type", "text"); - working on sort by type - to be cont... 
    searchBar.placeholder = "Enter Pokemon Name";

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";

    searchBarContainer.appendChild(searchBar); // adding the search bar to the page
    searchBarContainer.appendChild(searchButton); // adding the search button to the page

    searchBar.addEventListener("input", function () {
      const searchTerm = searchBar.value.toLowerCase();
      console.log("searchTerm", searchTerm, searchBar.getValue);
      const foundPokemons = pokemonList.filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(searchTerm)
          // return pokemon.name.toLowerCase().indexOf(searchTerm)!== -1; - tryout codes to figure out this filtering process 
      // function to filter out the pokemon(s) that match the search term
    });
      // pokemonList.forEach(function (pokemon) {
      //   if (pokemon.name.toLowerCase().indexOf(searchTerm)!== -1) {
      //     addListItem(pokemon);

      console.log(foundPokemons);
      removeAllitems(); // hide the rest of the pokemons from the list
      // for each pokemon that matches the search term add it to the results list
      foundPokemons.forEach(function (pokemon) {
        addListItem(pokemon);
      });

    });
  }

  // activating SearchBar function 
  createSearchBar(pokemonList); 

  function getAll() {
    return pokemonList;
  }
  // data-toggle="modal" data-target="#exampleModal"

  // activating hide pokemon list to accomodate results from filter function
function removeAllitems() {
  let pokemonList = document.querySelector(".list-group");

  pokemonList.innerHTML = "";
}

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    //creating li element inside the ul
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");
    // creating button element inside the li
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class", "btn");
    //bootstrap class
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#Modal");
    //append button to the li listpokemon as its child
    listpokemon.appendChild(button);
    //append the li listpokemon to the ul pokemonList as its child
    pokemonList.appendChild(listpokemon);
    //button
    listpokemon.addEventListener("click", function () {
      console.log("button");
      showDetails(pokemon);
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // Sort the array alphabetically by name
        json.results.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });

        // Iterate through the sorted list
        // console.log("api"json.results) testing out how to sort alphabetically
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };

          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
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
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Create modal
  function showModal(item) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    // let modalHeader = document.querySelector(".modal-header"); unused

    // //Clear all existing modal content
    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";
    //creating element for name in modal content
    let nameElement = document.createElement("modal-header");
    nameElement.innerText = item.name;
    //creating img in modal content
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", item.imageUrl);
    //creating element for height in modal content
    let heightElement = document.createElement("p");
    heightElement.innerText = "height: " + item.height;
    //creating element for type in modal content
    function typeCount(item) {
      if (item.types.length === 2) {
        return item.types[0].type.name + ", " + item.types[1].type.name;
      } else {
        return item.types[0].type.name;
      }
    }
    let typeElement = document.createElement("p");
    typeElement.innerText = "type: " + typeCount(item);

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
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  //now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// more tryout codes 
// const searchBar = document.getElementById("searchBar");
// searchBar.type = "text";
// searchBar.placeholder = "Search for a Pokemon";
// searchBar.addEventListener("input", handleSearch);

// const searchButton = document.getElementById("button");
// searchButton.textContent = "search";

// function handleSearch() {
//   const searchTerm = searchBar.value.toLowerCase();
//   // Perform the search based on the searchTerm
//   // You can use the searchTerm to filter or search through a list of items
//   // For example, you can filter an array of items based on the searchTerm
// }

// function handleSearch() {
//   const searchTerm = searchBar.value.toLowerCase();
//   const filteredPokemon = pokemonList.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(searchTerm)
//   );

//   // Update the UI with the filtered Pokemon
//   // For example, you can clear the existing list and add the filtered Pokemon to the UI
//   // You can use the filteredPokemon array to display the Pokemon that match the search term
// }
