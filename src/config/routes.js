const express = require('express');
const {grabArticles} = require('../controller/scrapper.js');
const Article = require('../models/articles');
// const Comments = require('../models/comments');

// variables
const router = express.Router();

router.get('/saved', (err, res) => {

  res.redirect('/');
});

router.post('/api/fetch', (err, res) => {
  let promiseInfo = function() {
      return new Promise(function(resolve, reject) {
        let results = grabArticles();

        if (results.length === 3) {
          resolve();
        }
      })
  };
  promiseInfo().then(() => {
    // console.log('this is api/fetch: ' + results);
    return;
  });
  res.redirect('/');
});

router.post('/comments', (err, res) => {
  res.redirect('/');
});

// default route
router.get('/', (err, res) => {
  const results = [];
  // finding all and displaying topic and title, which is the 2nd param
  Article.find({}, 'topic title', (err, data) => {
    // console.log(data);
    results.push(data);
  }).then((results) => {
      res.render('firstPage', {test: results})
    })
});

module.exports = router;
