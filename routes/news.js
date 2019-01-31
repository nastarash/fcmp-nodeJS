var express = require('express');
var router = express.Router();
var News = require('../model/newsSchema');
const fetch = require("node-fetch");

router.route('/').post(function (req, res) {
  var article = new News({
    title: req.body.title,
    source: {
      id: req.body.id
    }
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