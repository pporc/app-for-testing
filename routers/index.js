const testDB = require('../db/tests');
const bodyParser = require('body-parser');
const utils = require('../utils');
const HttpError = require('../error').HttpError;


const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Tests' });
  });

  app.get('/create', (req, res) => {
    const { name, num } = req.query;

    res.render('createForm', { title: 'Tests', name, num });
  });

  app.get('/create-setings', (req, res) => {
    res.render('createSetings', { title: 'Tests' });
  });

  app.post('/create', urlencodedParser, (req, res) => {
    const body = req.body;
    const data = utils.sortData(body);
    testDB.saveTest(data);
    res.redirect('/');
  });

  app.get('/tests', (req, res) => {
    // testDB.getTest().exec((err, tests) => {
    //   const testName = [];

    //   if (err) console.log(err);

    //   tests.forEach(val => testName.push(val.name));

    //   return res.render('tests', { title: 'Tests', testName });
    // });
    testDB.getTest().exec((err, tests) => {
      const test = [];

      if (err) console.log(err);

      tests.forEach((val) => {
        test.push({
          name: val.name,
          QuestionNum: val.list.length,
          date: `${val.date.getDate()}.${val.date.getMonth() + 1}.${val.date.getFullYear()}`,
        })
      });

      return res.render('tests', { title: 'Tests', test });
    });
  });

  app.get('/tests/:name', (req, res, next) => {
    testDB.getTest({ name: req.params.name }).exec((err, test) => {
      if (err) return next(err);
      if (test.length === 0) {
        next(new HttpError(404, 'Test not found'));
      } else {
        const { list } = test[0];
        res.render('testing', { title: 'Tests', list });
      }
    });
  });

  app.post('/result', urlencodedParser,  (req, res) => {
    const postValue = req.body;
    const name = req.headers.referer.split('/').pop();
    const decodeName = decodeURI(name)

    testDB.getTest({ name: decodeName }).exec((err, test) => {
      const isCorrect = test[0].isCorrect;
      const result = utils.testResult(postValue, isCorrect);

      res.render('result', { title: 'Tests', result });
    });
  });
};
