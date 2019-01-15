var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/news",{useNewUrlParser: true});

var Schema = mongoose.Schema;
var newsSchema = new Schema({
  title:  String,
});
var News = mongoose.model('News', newsSchema);

router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

router.route('/').post(function (req, res) {
  var article = new News({title: req.body.title});
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