const express = require('express');
const {grabArticles} = require('../controller/scrapper.js');

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
  res.render('firstPage');
});

module.exports = router;
