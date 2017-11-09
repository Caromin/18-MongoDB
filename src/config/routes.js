const express = require('express');
const mongoose = require('mongoose');

// Imported local files
const {grabArticles} = require('../controller/scrapper.js');
const Article = require('../models/articles');
const Current = require('../models/current');
const Comments = require('../models/comments');

// Imported Promise ES6
mongoose.Promise = global.Promise;

// variables
const router = express.Router();

// Create/Save Route
router.post('/saved', (req, res) => {
  // console.log('this is server side: ' + req.body.id);
  Current.findOne({ '_id': req.body.id})
    .then((data) => {
      // console.log('this is all of the data ' + data);
      Article.count({url: data.url}, (err, count) => {

        if (count === 0) {
          const newArticle = new Article({
            topic: data.topic,
            title: data.title,
            url: data.url
          });
          newArticle.save();
          res.send({response: true});

        } else {
          res.send({response: false});

        }
    });
  })
});

// Display Saved Route
// Deleted any existing articles in current collections
router.get('/displayArticles', (req, res) => {
  Current.remove({}, (err, data) => {
    console.log('current collections was deleted');
  });

  Article.find({}, 'topic title url', () => {
  })
    .sort({createdAt: 'desc'})
    .then((data) => {
      res.send({response: data});
    });
});

//IMPORTANT FOR NEW USERS : is a special identifier to create unique paramas!!!!!!!!!
// req.params is the properties tied to the router in this example it is :uid
router.delete('/delete/:uid', (req, res) => {
  console.log(req.params.uid);

  // console.log('this is server side: ' + req.body.id);
  Article.remove({_id: req.params.uid}, () => {
      // console.log(req.body.id + 'found and deleted');
  }).then((data) => {
    res.send({response: req.body.id + 'was removed'});
  })
});

// ERROR EXISITNG WITH PROMISE!!!!! MINOR NEEDS ATTENTION
// Runs and SHOULD display cheerio articles (scrapped)
// SHOULD GENERATE THE COLLECTIONS THENNNNNN GRAB INFO, BUT GRABBING INFO BEFORE INFO IS SAVED
router.get('/api/fetch', (req, res) => {
  const promiseInfo = new Promise((resolve, reject) => {
    if ( grabArticles() === undefined ) {
      // console.log('hurrayyyy');
      resolve();
    } else {
      // console.log('oh nooooooo!');
      reject();
    }
  });

  promiseInfo.then(() => {
    Current.find({}, 'topic title url', () => {
    }).limit(3)
      // gives the last three articles saved in current models
      .sort({createdAt: 'desc'})
      .then((data) => {
        res.send({response: data, total: 'Articles were found!'});
      })
  });
});


router.post('/comments', (req, res) => {
  res.redirect('/');
});

// Default route
router.get('/', (req, res) => {
  res.render('firstPage');
});


module.exports = router;
