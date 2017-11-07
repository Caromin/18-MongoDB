const express = require('express');
const {grabArticles} = require('../controller/scrapper.js');
const Article = require('../models/articles');
const Current = require('../models/current');
// const Comments = require('../models/comments');

// variables
const router = express.Router();

router.get('/saved', (err, res) => {

  res.redirect('/');
});

router.get('/api/fetch', (err, res) => {
  // finding all and displaying topic and title, which is the 2nd param
  let promiseInfo = () => {
      return new Promise(function(resolve, reject) {
        resolve(grabArticles());
      });
  };

  promiseInfo().then(() => {
    // let results = [];
    Current.find({}, 'topic title', (err, data) => {
      // results.push(data);
    }).limit(3).then((data) => {
      console.log('this is after .then: ' + data);
    res.send({response: data});
    })
  });
});

router.post('/comments', (err, res) => {
  res.redirect('/');
});

// default route
router.get('/', (err, res) => {
  res.render('firstPage');
});

module.exports = router;
