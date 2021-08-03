// List of Pokemons and their name, height, and types
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function getAll() {
		return pokemonList;
	}

	// The following function adds new pokemon arrays to the list of pokemon
	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	// The following function creates buttons for each pokemon in the repository
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');	
		let listItem = document.createElement('li');
		let button = document.createElement('button')

		button.innerText = pokemon.name;

		button.classList.add('button-class');

		listItem.appendChild(button);

		pokemonList.appendChild(listItem);

		button.addEventListener ('click', showDetails);
	}

	function showDetails(pokemon) {
		console.log(pokemon);
	}

	//The following function fetches data from the API and adds it to the list using the add function
	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function(json) {
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

	//The following function will load details about individual pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};
})();

// forEach() loop to display pokemonList
pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach( function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
