const express = require('express');

// variables
const router = express.Router();

// default route
router.get('/', (err, res) => {
  res.render('firstPage');
});

module.exports = router;
