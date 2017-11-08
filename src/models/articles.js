const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  topic: String,
  title: String
},
{
  timestamps: true
});

// I believe good practice to name the model name same as const
// Second param is the schema that the model is using
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
