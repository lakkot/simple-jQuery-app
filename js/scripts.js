

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

  //add item to list (active table)
  function addListItem(item) {
    var listContainer = $('.pokemon-list');
    //var listItem = $('<li class="list-group-item"></li>');
    //listContainer.append(listItem);
    var listButton = $('<button type="button" class="btn btn-light col-3 poke-list" data-toggle="modal" data-target="#pokemon-modal"></button>');
    listButton.text(item.name);
    listContainer.append(listButton);
    listButton.on('click', () => {
      showDetails(item);
    });
  }
  //get list of items form API
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
  //load item details from API (url obtained from previous api)
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
  //show modal and fill it with info from loadDetail function
  function showDetails (item) {
    loadDetails(item).then( () => {
    var $modalTitle = $('.modal_title');
    var $textContainer = $('.modal-left');
    var $imageContainer = $('.modal-right');

    $textContainer.html('');
    $imageContainer.html('');
    $modalTitle.html('');

    var modalName = $('<h5 class="modal-title" id="modal-title"></h5>');
    modalName.text(item.name);
    $modalTitle.append(modalName);



    var modalHeight = $('<p></p>');
    modalHeight.text('Height: ' + item.height + '0 centimeters');
    $textContainer.append(modalHeight);


    var abilitiesArray = [];
    function addAbilities(item) {
      for (i = 0; i < item.abilities.length; i++) {
        abilitiesArray.push(' ' + item.abilities[i].ability.name);
      }
    };
    addAbilities(item);

    var modalInfo = $('<p></p>');
    modalInfo.text('Abilities:' + abilitiesArray);
    $textContainer.append(modalInfo);


    var modalImage = $('<img class="poke-image"></img>');
    modalImage.attr('src', item.imageUrl);
    $imageContainer.append(modalImage);

  })};

  $(document).ready(function(){
    $("#search-field").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".poke-list").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  //make functions available outside IIFE
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    laodDetails: loadDetails,
    addListItem: addListItem,
  }

}());



//load list, then for each item from array add item to the printed list
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
