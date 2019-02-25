const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    id: Number,
    title: String,
    author: String,
    description: String,
    url: String,
    img: String,
    publishedAt: { type: Date, default: Date.now },
    content: String
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;