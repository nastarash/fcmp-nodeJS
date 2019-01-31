var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/news", {
    useNewUrlParser: true
});

var Schema = mongoose.Schema;
var newsSchema = new Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String
});
var News = mongoose.model('News', newsSchema);

module.exports = News;
