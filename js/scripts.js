var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return repository;
  }

  function add(item) {
    repository.push(item);
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

  function addListItem(pokemon) {
    var li = $('.item-list');
    var $element = $('.pokemon-modal');
    var btn = $('<input/>').attr({
      type: 'button',
      id: 'addBtn',
      value: pokemon.name
    });
    li.append(btn);

    btn.on('click', function(e) {
      showDetails(pokemon);
    });
  }


  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function(details) {
      item.imgUrl = details.sprites.front_default,
      item.height = details.height,
      item.types = [];
      item.types.forEach(function(e) {
        item.types.push(' ' + e.type.name);
        return item.types;
      });
    }).catch(function (e) {
      console.error(e)
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      var modal = $('.pokemon-modal');
      var name = $('<h2></h2>').text(item.name);
      var height = $('<p class="pokemon-height"></p>').text('Height: ' + item.height);
      var types = $('<p class="pokemon-types"></p>').text('Types: ' + item.types);
      var image = $('<img class="pokemon-image">').attr('src', item.imageUrl);

      modal.append(image)
      modal.append(name)
      modal.append(height)
      modal.append(types)
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
  });
});
