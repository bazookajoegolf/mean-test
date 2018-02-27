
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');



//Register

router.post('/test',(req, res, next) => { 
    console.log("from test");
    res.send("you've got a response from test");
    

});

router.post('/register',(req, res, next) => {
    let newUser = new User({

        name: req.body.name,
        email:req.body.email,
        username: req.body.username,
        password:req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:"Failed to Register User"});
        } else {
            res.json({success:true, msg:"User Registered"});
        }
    });

    //res.send('REGISTER');
});

//authenticate route

router.post('/authenticate',(req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
        
    User.getUserByUsername(username, (err, user) => {
       
        if(err)  throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not Found'});
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn:604800  //1 week

                });

                res.json({
                    success: true, 
                    token: 'Bearer '+token,
                   //token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username, 
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }

        });
    });
});

//Profile route

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    console.log("returning the profile route");
    //res.send('profile route');
    res.json({user:req.user})
});


module.exports = router;