$(document).ready(function() {
  $('#modulebtn').on("click", function() {
    ScrapArticles();
    });
  $('#savedArts').on('click', function() {
    DisplaySavedArticles();
  })
});

$('body').on('click', '.saveCurrent', function (){
  const id = this.id;
  const data = {id: this.id};
  SaveArticle(id, data);
});

$('body').on('click', '.delete', function (){
  const id = this.id;
  const data = {id: this.id};
  DeleteArticle(id, data);
});

SaveArticle = (id, data) => {
  $.ajax({
    type: 'POST',
    url: '/saved',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response) {
      console.log(id);
      $('#' + id.toString())
        .addClass('newBtnColor nohover btn-disabled')
        .removeClass('saveCurrent')
        .text('Saved!');
      console.log('this is the end client side reponse: ' + response.response);
    }
  });
}


DisplaySavedArticles = () => {
  $.ajax({
    type: 'GET',
    url: '/displayArticles',
    contentType: 'application/json',
    dataType: 'json',
    success: function(response) {
      console.log(response.response);
      $('#resultsdiv').html('');
      for (i = 0; i < response.response.length; i ++) {
        $('#resultsdiv')
          .append('<div class=" row topNews">'
            + '<div class="col-6 text-left"><b>Topic:</b> ' + response.response[i].topic + '</br>'
            + '<b>Title:</b> ' + response.response[i].title + '</br>'
            + '<b>URL:</b> ' + '<a href=' + response.response[i].url + ' target="_blank">Link</a>'
            + '</div>'
            + '<div class="col-3"><button id=' + response.response[i]._id + ' class="btn btn-primary " type="submit" >Add Comment</button></div>'
            + '<div class="col-3"><button id=' + response.response[i]._id + ' class="btn btn-primary delete" type="submit" >Delete Article</button></div>'
            + '</div><hr>'
        );
      }
    }
  });
}


DeleteArticle = (id, data) => {
  $.ajax({
    type: 'POST',
    url: '/delete',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response) {
      DisplaySavedArticles();
    }
  });
}


ScrapArticles = () => {
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
            + '<div class="col-3"><button id=' + response.response[i]._id + ' class="btn btn-primary saveCurrent" type="submit" >Save Article</button></div>'
            + '</div><hr>'
        );
      }
      $('#modalbody').html('');
      $('#modalbody').html(response.total);
    }
  });
}
