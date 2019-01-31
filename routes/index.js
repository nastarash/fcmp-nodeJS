var express = require('express');
var router = express.Router();
var News = require('../model/newsSchema');
const fetch = require("node-fetch");
const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e25f68463ae0441a947aadda3a0fa55c';

router.route('/').get((req, res) => {
  fetch(url).then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })).then(res => {
      const articleArr = res.data.articles || [];
      articleArr.forEach(article => {
        const newsFromApi = new News({
          source: {
            id: article.source.id,
            name: article.source.name
          },
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        });
        newsFromApi.save();
      })
    })).then(res.render('index',{title:'news'}))
});

module.exports = router;