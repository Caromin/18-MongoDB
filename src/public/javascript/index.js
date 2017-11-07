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
              .append('<div class="topNews">'
                + '<b>Topic:</b> ' + response.response[i].topic + '</ br>'
                + '<b>Title:</b> ' + response.response[i].title + '</ br>'
                + '<button id=' + response.response[i].id + ' class="btn btn-primary" type="submit" >Save Article</button>'
                + '</div>'
            );
          }
  			}
  		});
    });
  });
