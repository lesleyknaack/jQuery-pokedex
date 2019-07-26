(function() {
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
        $.each(res.results, function() {
          var pokemon = {
            name: res.name,
            detailsUrl: res.url
          }
          add(pokemon)

        }).catch(function (e) {
          console.error(e)
        });
      });
    }

    function addListItem(pokemon) {
      var $element = $('.pokemon-modal');
      var $detailsButton = $('<input type="button" value="new button"/>');
      $detailsButton.append($element);
    }


    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url).then(function(details) {
        item.imgUrl = details.sprites.front_default,
        item.height = details.height,
        item.types = [];
        res.types.forEach(function(e) {
          item.types.push(' ' + e.type.name);
          return item.types;
        });
      }).catch(function (e) {
        console.error(e)
      });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(item).then(function () {
        var modal = $('.pokemon-modal');
        var name = $('<h2></h2>').text(pokemon.name);
        var height = $('<p class="pokemon-height"></p>').text('Height: ' + pokemon.height);
        var types = $('<p class="pokemon-types"></p>').text('Types: ' + pokemon.types);
        var image = $('<img class="pokemon-image">').attr('src', pokemon.imageUrl);

        modal.append(image)
        modal.append(name)
        modal.append(height)
        modal.append(types)
      });
    }

    pokemonRepository.loadList().then(function () {
      var pokemons = pokemonRepository.getAll();
      $.each(pokemons, function(index, pokemon){
        addListItem(pokemon);
      });
    });

    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      addListItem: addListItem,
      showDetails: showDetails
    }
  });
}) ();
