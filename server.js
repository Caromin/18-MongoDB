// required packages
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// variables
const app = express();
const PORT = process.env.PORT || 8080;
//potential helper functions used in handlebars and other options
const hbs = exphbs.create({
  helpers: {

  },
  defaultLayout: 'main'
})

// static files, ignored by morgan logger
app.use(express.static(__dirname + '/src/public'));
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// views
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

//test route
app.get('/', (err, res, next) => {
  //can't be the defaultLayout
  //pass any variables through here
  res.render('firstPage');
})

app.listen(PORT, () => {
  console.log('listening at port: ' + PORT);
});
