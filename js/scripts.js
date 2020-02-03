

var dogBreeds = (function() {

  var repository = [];
  var apiUrl = 'https://dog.ceo/api/breeds/list/all';
  var apiUrl2 = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container')

  function add(dogBreed) {
    repository.push(dogBreed);
  }
  //see all items
  function getAll() {
    return repository;
  }


  function addListItem(dogBreed) {
    var $listContainer = $('ul');
    var $listItem = $('<li><button class="button">button</button></li>');
    $listContainer.append('listItem');
    //var $listButton = $("<button class='button'>button</button>")
    //$listItem.append($listButton);
    //$listButton.on('click', () => {});
  }
/*
  function addListItem(listItem) {
    //assign variable to ul list
    var $pokemonMainList = document.querySelector('ul');
    // assign variable to list item (not existing in html)
    var $listItem = document.createElement('li');
    // assign variable to button (not existing in html)
    var $button = document.createElement('button');
    // creating a conditional from what will be written inside the button
    $button.innerText = listItem.name;
    //adding a CSS class to the button
    $button.classList.add('button');
    //nesting list items inside a ul item
    $pokemonMainList.appendChild($listItem);
    //nesting a button inside the list item
    $listItem.appendChild($button);
    $button.addEventListener('click', function() {
      showDetails(listItem);
    });
  }
*/


  function loadList() {
    $.ajax(apiUrl2, {dataType: 'json' }).then(function(responseJSON) {
      return responseJSON;
    }).then(function(json) {
      $.each(json.results, function(index, item) {
        var dog = {
          name: item.name,
          detailsUrl: item.url
        };
        add(dog);
      });
    }).catch(function (e) {
      console.log(e);
    })
  };
/*
  function loadList() {
    return fetch(apiUrl2).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
        console.log(error);
      })
    };
*/
/*
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
    dogBreeds.loadDetails(item).then(function() {
      $textContainer.innerHTML ='';
      $imageContainer.innerHTML ='';
      $modalName.add()
    })
  }
*/
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem
  }

}());


console.log(dogBreeds.getAll());

dogBreeds.loadList().then(function() {
  dogBreeds.getAll().forEach(function(item) {
    dogBreeds.addListItem(item);
  });
});
