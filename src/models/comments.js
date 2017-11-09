const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: String,
  articleId: String
},
{
  timestamps: true
});

// I believe good practice to name the model name same as const
// Second param is the schema that the model is using
const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
