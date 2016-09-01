console.log('main.js sourced');

var searchResults = [];
$(document).ready(function(){

  $('#searchButton').on('click', function(){
    console.log('in searchButton on click');
    var movie = $('#movieIn').val();
    console.log('searched for:', movie);
       var searchURL = 'http://www.omdbapi.com/?s=' + movie;
    $.ajax({
      url: searchURL,
      dataType: 'JSON',
      success: function(data){
        console.log('ajax success!', data.Search);
        searchResults = data.Search;
        console.log('searchResults:', searchResults);
        showResults(searchResults);
      }
    });
  });
});

console.log('api script sourced');

$(document).on('click', '#searchNow', function(){
  var searchTitle = $('#searchIn').val();
  console.log('searching for:', searchTitle);
  var searchURL = 'http://www.omdbapi.com/?s=' + searchTitle;
  $.ajax({
    url: searchURL,
    dataType: 'JSON',
    success: function(data){
      console.log('API success!', data);
      showResults(data.Search);
    },
    statusCode: {
      404: function(){
        alert('nope! not found');
      }
    }
  });
});

var showResults = function(results){
  console.log('in showResults', results);
  $('#outputDiv').empty();
  for(var i = 0 ; i < results.length; i++){
    $('#outputDiv').append('<p><b>' + results[i].Title + '</b> (' + results[i].Year + ')</p>');
    $('#outputDiv').append('<img src="' + results[i].Poster + '">')
  }
  };
