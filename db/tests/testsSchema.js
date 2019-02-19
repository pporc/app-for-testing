const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const TestSchema = new Schema({
name: {
  type: String,
  required: true
},
date: {
  type: Date,
  default: Date.now
},
list: {
  type: Array,
  required: true
},
isCorrect: {
  type: Array,
  required: true
}
});
module.exports = TestSchema;