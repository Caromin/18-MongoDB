const express = require('express');
const {grabArticles} = require('../controller/scrapper.js');
const Article = require('../models/articles');
const Current = require('../models/current');
const mongoose = require('mongoose');
const Comments = require('../models/comments');
mongoose.Promise = global.Promise;

// variables
const router = express.Router();

router.post('/saved', (req, res) => {
  // console.log('this is server side: ' + req.body.id);
  Current.findOne({ '_id': req.body.id}).then((data) => {
    // console.log(data.title);
    const newArticle = new Article({
      topic: data.topic,
      title: data.title,
      url: data.url
    });

    newArticle.save();

    res.send({response: req.body.id + 'was sent to Articles Collection'});
  })
});

router.get('/displayArticles', (req, res) => {

  Current.remove({}, (req, data) => {
    console.log('current collections was deleted');
  });

  Article.find({}, 'topic title url', (req, data) => {
  })
    .sort({createdAt: 'desc'})
    .then((data) => {
      res.send({response: data});
    });
})

router.post('/delete', (req, res) => {
  // console.log('this is server side: ' + req.body.id);
  Article.remove({_id: req.body.id}, (err, success) => {
      console.log('id found and deleted');
  }).then((data) => {
    res.send({response: req.body.id + 'was removed'});
  })
});

router.get('/api/fetch', (req, res) => {
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
    Current.find({}, 'topic title url', (req, data) => {
    }).limit(3)
      // gives the last three articles saved in current models
      .sort({createdAt: 'desc'})
      .then((data) => {
        res.send({response: data, total: 'Articles were found!'});
        // console.log(data);
    })
  });
});

router.post('/comments', (req, res) => {
  res.redirect('/');
});

// default route
router.get('/', (req, res) => {
  res.render('firstPage');
});

module.exports = router;
