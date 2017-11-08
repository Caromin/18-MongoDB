$(document).ready(function() {
  $('#modulebtn').on("click", function() {
      $.ajax({
        url: '/api/fetch',
        contentType: 'application/json',
  			success: function(response) {
          $('#resultsdiv').html('');
          //this is a array inside of a variable, the naming comes from the res.send
          console.log(response.response);
  				for (i = 0; i < response.response.length; i ++) {
            $('#resultsdiv')
              .append('<div class=" row topNews">'
                + '<div class="col-9 text-left"><b>Topic:</b> ' + response.response[i].topic + '</br>'
                + '<b>Title:</b> ' + response.response[i].title + '</br>'
                + '<b>URL:</b> ' + '<a href=' + response.response[i].url + ' target="_blank">Link</a>'
                + '</div>'
                + '<div class="col-3"><button id=' + response.response[i].id + ' class="btn btn-primary" type="submit" >Save Article</button></div>'
                + '</div><hr>'
            );
          }
          $('#modalbody').html('');
          $('#modalbody').html(response.total);
  			}
  		});
    });
  });
