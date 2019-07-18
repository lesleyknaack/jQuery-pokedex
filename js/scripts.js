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

    function loadList() {
      return $.ajax(apiUrl, {datatype: 'json'}).then(function(item) {
        $.each(item.results, function(index, item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          }
          add(pokemon)

        }).catch(function (e) {
          console.error(e)
        });
      });
    }

    var url = detailsUrl;
    return $.ajax(detailsUrl, {datatype: 'json'}).then(function(details) {
      item.imgUrl = details.sprites.front_default,
      item.height = details.height,
      item.types = [];
      res.types.forEach(function(e) {
        item.types.push(' ' + e.type.name);
        return item.types;
    })

  });
}) ();
