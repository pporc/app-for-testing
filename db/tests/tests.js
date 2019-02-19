const mongoose = require('../mongoose');
const schema = require('./testsSchema');

const Test = mongoose.model('Test', schema);

module.exports = {
  saveTest(data) {
    const newTest = new Test(data);
    return newTest.save(data);
  },

  getTest(query, isOne) {
    const method = isOne ? 'findOne' : 'find';

    return Test[method](query);
  },

  update(query, data) {
    return Test.update(query, data);
  },
};
