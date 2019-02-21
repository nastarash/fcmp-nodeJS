var express = require('express');
var router = express.Router();
var News = require('../model/newsSchema');
const fetch = require("node-fetch");

router.route('/').post(function (req, res) {
  var article = new News({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    publishedAt: req.body.publishedAt,
    content: req.body.content
  });
  article.save(function (err) {
    if (err) {
      res.send(err)
    } else {
      res.json({
        message: 'Article created!'
      });
    }
  });
}).get((req, res) => {
  News.find((err, news) => {
    if (err) {
      res.send(err);
    } else {
      res.json(news);
    }
  });
});

router.route('/:id')
  .get(function (req, res) {
    News.findById(req.params.id, function (err, article) {
      if (err)
        res.send(err);
      res.json(article);
    });
  })
  .put(function (req, res) {
    News.findById(req.params.id, function (err, article) {
      if (err) {
        res.send(err);
      } else {
        article.title = req.body.title;
        article.author= req.body.author;
        article.description= req.body.description,
        article.url= req.body.url,
        article.urlToImage= req.body.urlToImage,
        article.publishedAt= req.body.publishedAt,
        article.content= req.body.content
      };
      article.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: 'Article updated!'
          })
        };
      });
    });
  })
  .delete(function (req, res) {
    News.remove({
      _id: req.params.id
    }, function (err, article) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: 'Successfully deleted!'
        });
      };
    });
  });

module.exports = router;