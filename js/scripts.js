

var pokemonRepository = (function() {

  var repository = [];
  //var apiUrl = 'https://dog.ceo/api/breeds/list/all';
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container')

  function add(pokemon) {
    repository.push(pokemon);
  }
  //see all items
  function getAll() {
    return repository;
  }


  function addListItem(pokemon) {
    var listContainer = $('ul');
    var listItem = $('<li></li>');
    listContainer.append(listItem);
    var listButton = $("<button class='button'></button>");
    listButton.text(pokemon.name);
    listItem.append(listButton);
    //$listButton.on('click', () => {});
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json' }).then(function(item) {
      $.each(item.results, function(index, item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.log(e);
    })
  };




  function loadDetails(item) {
    var url = item.detailsUrl;
    $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
      item.abilities = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  };

  function showDetails(item) {
    var $textContainer = $('.modal-left');
    var $imageContainer = $('#modal-image');
    pokemonRepository.loadDetails(item).then(function() {
      $textContainer.innerHTML ='';
      $imageContainer.innerHTML ='';
      $modalName.add()
    })
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem
  }

}());

console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
