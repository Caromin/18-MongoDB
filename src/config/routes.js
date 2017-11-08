const express = require('express');
const {grabArticles} = require('../controller/scrapper.js');
const Article = require('../models/articles');
const Current = require('../models/current');
const mongoose = require('mongoose');
const Comments = require('../models/comments');
mongoose.Promise = global.Promise;

// variables
const router = express.Router();

router.get('/saved', (err, res) => {

  res.redirect('/');
});

router.get('/api/fetch', (err, res) => {
  const promiseInfo = new Promise((resolve, reject) => {
    if ( grabArticles() === undefined ) {
      console.log('hurrayyyy');
      resolve();
    } else {
      console.log('oh nooooooo!');
      reject();
    }
  });

  promiseInfo.then(() => {
    Current.find({}, 'topic title', (err, data) => {
    }).limit(3)
      // gives the last three articles saved in current models
      .sort({createdAt: 'desc'})
      .then((data) => {
        res.send({response: data, total: 'Articles were found!'});
        // console.log(data);
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
