const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentSchema = new Schema({
  topic: String,
  title: String
});

// I believe good practice to name the model name same as const
// Second param is the schema that the model is using
const Current = mongoose.model('Current', CurrentSchema);

module.exports = Current;
