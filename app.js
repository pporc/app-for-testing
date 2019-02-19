const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const errorHandler = require('errorhandler');
const HttpError = require('./error').HttpError;

const app = express();


app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(require('./middleware/sendHttpError'));

require('./routers')(app);

app.use((err, req, res, next) => {
  if (typeof err == 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    errorHandler()(err, req, res, next);
  }
});

app.listen(config.get('port'), () => console.log('server started'));
