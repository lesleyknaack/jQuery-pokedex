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

    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails
    }
  });
}) ();
