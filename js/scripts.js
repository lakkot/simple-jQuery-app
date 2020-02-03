

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

/*
  function addListItem(dogBreed) {
    var $listContainer = $('ul');
    var $listItem = $('<li></li>');
    $listContainer.append('listItem');
    var $listButton = $("<button class='button'></button>")
    $listItem.append($listButton);
    //$listButton.on('click', () => {});
  }
*/
  function loadList() {
    $.ajax(apiUrl2, {dataType: 'json' }).then(function(responseJSON) {
      return responseJSON;
    }).then(function(json) {
      $.each(json.results, function(index, item) {
        var dog = {
          name: item.name,
          detailsUrl = item.url
        };
        add(dog);
      });
    }).catch(function (e) {
      console.log(e);
    })
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

  return {
    add: add,
    getAll: getAll,
    loadList: loadList
  }

}());


dogBreeds.getAll();
dogBreeds.loadList();
console.log(dogBreeds.getAll());


/*
dogBreeds.loadList().then(function() {
  dogBreeds.getAll().forEach(function(item) {
    dogBreeds.addListItem(item);
  });
})
*/
