

const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


router.post('/test',(req, res, next) => { 
  //  console.log("from test");
    res.send("you've got a response from test");
    

});

router.get('/profile',(req, res, next) => {
    console.log("returning the profile route");
    res.send('profile route');
});


module.exports = router;