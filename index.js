var express = require('express');
require("dotenv").config();
var app = express();
var cors = require('cors');
const dal = require('./dal.js');
// const e = require('express');
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"
// const firebaseConfig = {
//     apiKey: "AIzaSyDdgPgF7wDOb1nEubXgwe7-wo_yApwHKr8",
//     authDomain: "bankapp-e20d4.firebaseapp.com",
//     projectId: "bankapp-e20d4",
//     storageBucket: "bankapp-e20d4.appspot.com",
//     messagingSenderId: "314215156902",
//     appId: "1:314215156902:web:10ec1a70ff6b8a9bbb3867",
//     measurementId: "G-9HEK36PDK8"
//   };

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// app.get("/", (req, res)=>{
//     res.send("im working");
// })

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if (users.length > 0) {
                console.log('User already in exists');
                res.send({ 'ldjf': "ldjf" });
            }
            else {
                // else create user
                dal.create(req.params.name, req.params.email, req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);
                    });
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if (user.length > 0) {
                if (user[0].password === req.params.password) {
                    res.send(user[0]);
                }
                else {
                    res.send('Login failed: wrong password');
                }
            }
            else {
                res.send('Login failed: user not found');
            }
        });

});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
        });
});
// app.get('account/update/:email/:amount', function(req,res)  {
//     dal.update(req.params.email, req.params.amount)
//         .then((user) => {
//             console.log(user);
//             res.send(user);
//         });      

// });
// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port: ' + port);