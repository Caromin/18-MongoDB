// Initial page load onclicks
$(document).ready(function() {
  $('#modulebtn').on("click", function() {
    ScrapArticles();
    });
  $('#savedArts').on('click', function() {
    DisplaySavedArticles();
  })
});

// For ajax generated buttons
$('body').on('click', '.saveCurrent, .delete, .addComment', function (){
  const id = this.id;
  const data = {id: this.id};
  const className = $(this).attr('class');
  // console.log(className);

  switch(className) {
    case 'btn btn-primary saveCurrent':
      SaveArticle(id, data);
      break;
    case 'btn btn-primary delete':
      DeleteArticle(id, data);
      break;
    case 'btn btn-primary addComment':
      AddComment(id, data);
      break;
    default:
      break;
  }
});

AddComment = (id, data) => {
  $('#modalbody').html('');
  $('.modal-title')
    .html('')
    .text('Add a Comment');
  $('#modalbody')
    .append(
      '<form method="POST" action="/comments" id="formId">'
      + '<textarea form="formId" rows="4" class="inputForm" placeholder="Enter text here..."></textarea>'
      + '<input id="sendComment" type="submit" value="Submit">'
      + '</form>'
  );
}

// Saves and adds classes from current collection moves to articles collections
SaveArticle = (id, data) => {
  $.ajax({
    type: 'POST',
    url: '/saved',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response) {
      if ( response.response === false ) {
        $('#' + id.toString())
          .addClass('btn-danger disabled')
          .removeClass('saveCurrent btn-primary')
          .text('Already Saved!');
          alert('Already Exists. \n\n' + 'This Article has already been saved, please check your Saved Articles');
      }
      else {
      // console.log(id);
      $('#' + id.toString())
        .addClass('btn-warning disabled')
        .removeClass('saveCurrent btn-primary')
        .text('Saved!');
        console.log('the article was moved from current to articles collections: ' + response.response);
      }
    }
  });
}


// Delete button in saved articles section
// SEE router.delete in routes.js for more comments about using delete router and req.params for unique url routes
DeleteArticle = (id, data) => {
  const url = '/delete/' + id.toString();
  $.ajax({
    type: 'DELETE',
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response) {
      DisplaySavedArticles();
    }
  });
}

// Displays articles collections onclick
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
            + '<div class="col-4 text-left"><b>Topic:</b> ' + response.response[i].topic + '</br>'
            + '<b>Title:</b> ' + response.response[i].title + '</br>'
            + '<b>URL:</b> ' + '<a href=' + response.response[i].url + ' target="_blank">Link</a>'
            + '</div>'
            + '<div class="col-4 text-left"><b>Comments:</b></br>'
        //more info here
            + '</div>'
            + '<div class="col-2"><button id=' + response.response[i]._id + ' class="btn btn-primary addComment" type="submit" >Add Comment</button></div>'
            + '<div class="col-2"><button id=' + response.response[i]._id + ' class="btn btn-primary delete" type="submit" >Delete Article</button></div>'
            + '</div><hr>'
        );
      }
    }
    // Able to pass reponse from success function above
  }).done((response) => {
    // console.log('is this working?' + response.response[0]._id);
    $('.btn.btn-primary.addComment')
      .attr({'data-toggle': "modal", 'data-target': "#confirmationModal"});
  });
}

// Using cheerio to grab inital articles
ScrapArticles = () => {
  $.ajax({
    url: '/api/fetch',
    contentType: 'application/json',
    success: function(response) {
      $('#resultsdiv').html('');
      $('#modalbody').html('');
      $('#modalbody').html(response.total);
      $('.modal-title')
        .html('')
        .text('Good News (Puns)');
      //this is a array inside of a variable, the naming comes from the res.send
      // console.log(response.response);
    }
  }).then((response) => {
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
  });
}
