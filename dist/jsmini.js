var pokemonRepository=function(){var t=[],e='https://pokeapi.co/api/v2/pokemon/?limit=150';function n(e){t.push(e)}function o(t){a(t).then(function(){var e=$('<h2>'+t.name+'</h2>'),n=$('<p class="pokemon-height">Height: '+t.height+"</p>"),o=$('<p class="pokemon-types">Type(s): '+t.types+"</p>"),a=$('<img class="pokemon-image img-fluid">').attr("src",t.imgUrl);$("#pokemon-name").html(e),$("#pokemon-details").html(n),$("#pokemon-details2").html(o),$("#pokemon-image").html(a),$("#modal-container").modal("show")})}function a(t){var e=t.detailsUrl;return $.ajax(e).then(function(e){t.imgUrl=e.sprites.front_default,t.height=e.height,t.types=[],e.types.forEach(function(e){return t.types.push(" "+e.type.name),t.types})}).catch(function(t){console.error(t)})}return{add:n,getAll:function(){return t},loadList:function(){return $.ajax(e,{datatype:"json"}).then(function(t){$.each(t.results,function(t,e){n({name:e.name,detailsUrl:e.url})})}).catch(function(t){console.error(t)})},loadDetails:a,addListItem:function(t){var e=$(".item-list"),n=$('<ul class="item-list_item"></ul>'),a=$('<button type="button" class="btn btn-primary pokemon-button" data-toggle="modal" data-target="#modal-container">'+t.name+"</button>");n.append(a),e.append(n),a.on("click",function(){o(t)})},showDetails:o}};const poke=pokemonRepository();poke.loadList().then(function(){var t=poke.getAll();$.each(t,function(t,e){poke.addListItem(e),poke.loadDetails(e)})});