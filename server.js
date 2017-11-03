// required packages
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//multiple modules from src folder
const {router, changeStatus} = require('./src/index');

// variables
const app = express();
const PORT = process.env.PORT || 8080;
// potential helper functions used in handlebars and other options
const hbs = exphbs.create({
  helpers: {

  },
  defaultLayout: 'main'
})

// static files, ignored by morgan logger
app.use(express.static(__dirname + '/src/public'));
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
// any requests being made,morgan generates logs automatically
// app.use(morgan('combined'));

// views
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

// routes, searching for first param inside of second param
app.use('/', router);
app.use('/saved', router);
app.use('/api/fetch', router);
app.use('/comments', router);

app.listen(PORT, () => {
  console.log('listening at port: ' + PORT);
});
