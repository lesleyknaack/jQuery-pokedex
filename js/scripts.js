var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function getAll() {
    return repository;
  }


  function add(item) {
    repository.push(item);
  }


  function addListItem(pokemon) {
    var $element = $('.item-list');
    var newList = $('<ul class="item-list_item"></ul>');
    var pokeBtn = $('<button type="button" class="btn btn-primary pokemon-button" data-toggle="modal" data-target="#modal-container">' + pokemon.name + '</button>');
    newList.append(pokeBtn);
    $element.append(newList);

    pokeBtn.on('click', function(e) {
      showDetails(pokemon);
    });
  }


  function showDetails(item) {
      loadDetails(item).then(function () {
        var $name = $('<h2>' + item.name + '</h2>');
        var $height = $('<p class="pokemon-height">' + "Height: " + item.height + '</p>');
        var $types = $('<p class="pokemon-types">' + "Type(s): " + item.types + '</p>');
        var $image = $('<img class="pokemon-image img-fluid">').attr('src', item.imgUrl);

        $("#pokemon-name").html($name);
        $("#pokemon-details").html($height);
        $("#pokemon-details2").html($types);
        $("#pokemon-image").html($image);
        $("#modal-container").modal('show');

      });
    }


  function loadList(item) {
    return $.ajax(apiUrl, {datatype: 'json'}).then(function(res) {
      $.each(res.results, function(index, data) {
        var pokemon = {
          name: data.name,
          detailsUrl: data.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
        console.error(e)
      });
  }


  function loadDetails(item) {
    //console.log(item)
    var url = item.detailsUrl;
    return $.ajax(url).then(function(details) {
      item.imgUrl = details.sprites.front_default,
      item.height = details.height,
      item.types = [],
      details.types.forEach(function(e) {
        item.types.push(' ' + e.type.name);
        return item.types;
      });
    }).catch(function (e) {
      console.error(e)
    });
  }


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  }
});

const poke = pokemonRepository();
poke.loadList().then(function() {
  var pokemons = poke.getAll();
  $.each(pokemons, function(index, pokemon) {
    poke.addListItem(pokemon);
    poke.loadDetails(pokemon);
  });
});
