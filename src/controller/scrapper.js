const request = require('request');
const cheerio = require('cheerio');
const Current = require('../models/current');


// function that uses cheerio npm
grabArticles = () => {
  request("https://fivethirtyeight.com/", function(error, response, html) {
    const $ = cheerio.load(html);

    for (x=1; x<4; x++) {
      // i is the current loop number, element=this is the current data requested
      $('#home-feature-' + x.toString()).each((i, element) => {
        const topic = $(element).children('.post-info').children('.topic').text().trim();
        const title = $(element).children('.post-info').children('.tease-meta').children('.tease-meta-content').children('h2.article-title.entry-title').text().trim();
        const url = $(element).children('a').attr('href');

        const newCurrent = new Current({
          topic: topic,
          title: title,
          url: url
        });
        // console.log('this is the new data scrapped' + url);
        newCurrent.save();
      })
    }
    return true;
  });
}


module.exports = {grabArticles};
