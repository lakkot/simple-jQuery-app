

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


  function addListItem(item) {
    var listContainer = $('ul');
    var listItem = $('<li></li>');
    listContainer.append(listItem);
    var listButton = $("<button class='button'></button>");
    listButton.text(item.name);
    listItem.append(listButton);
    listButton.on('click', () => {
      showDetails(item);
    });
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
    return $.ajax(url).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
      item.abilities = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  };

  function showDetails (item) {
    loadDetails(item).then( () => {
    var $textContainer = $('.modal-left');
    var $imageContainer = $('#modal-image');
    $textContainer.html('');
    $imageContainer.html('');
    var modalName = $('<h1></h1>');
    modalName.text(item.name);
    $textContainer.append(modalName);
    var modalHeight = $('<p></p>');
    modalHeight.text('Height: ' + item.height + '0 centimeters');
    $textContainer.append(modalHeight);
    var modalInfo = $('<p></p>');
    var modalImage = $('<img></img>');
    modalImage.attr('src', item.imageUrl);
    $imageContainer.append(modalImage);
    var abilitiesArray = [];
    function addAbilities(item) {
      for (i = 0; i < item.abilities.length; i++) {
        abilitiesArray.push(' ' + item.abilities[i].ability.name);
      }
    };
      addAbilities(item);
      modalInfo.text('Abilities:' + abilitiesArray);
      $textContainer.append(modalInfo);

      $modalContainer.addClass('is-visible');
  })};

  $('.close-modal').on('click', () => {
    $modalContainer.removeClass('is-visible');
  })

  $(window).on('keydown', (e) => {
    if(e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
      $modalContainer.removeClass('is-visible');
    }
  })


  $modalContainer.on('click', (e) => {
    var target = e.target;
    var modalContainer = document.querySelector('#modal-container');
    if (target === modalContainer) {
      $modalContainer.removeClass('is-visible');
    }
  })

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    laodDetails: loadDetails,
    addListItem: addListItem,
  }

}());

console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
