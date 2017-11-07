const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/articles');

// function that uses cheerio npm
grabArticles = () => {
  let results = [];
  request("https://fivethirtyeight.com/", function(error, response, html) {
    const $ = cheerio.load(html);
    for (x=1; x<4; x++) {
      results = [];
      // i is the current loop number, element=this is the current data requested
      $('#home-feature-' + x.toString()).each((i, element) => {
        const topic = $(element).children('.post-info').children('.topic').text().trim();
        const title = $(element).children('.post-info').children('.tease-meta').children('.tease-meta-content').children('h2.article-title.entry-title').text().trim();

        const newArticle = new Article({
          topic: topic,
          title: title
        });

        newArticle.save();
        // console.log('this is results for ' + x + ": " + newArticle);
        results.push(newArticle);
      })
    }

  });
  return results;
}


module.exports = {grabArticles};
