var express = require('express');
require("dotenv").config();
var app     = express();
var cors    = require('cors');
const dal     = require('./dal.js');
const e = require('express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');
// var bodyParser = require('body-parser');
// const swaggerDocument = require('./swagger.json');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'Badbank API',
//             version: '1.0.0'
//         }
//     },
//     apis: ['index.js']
// };
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// /**
//  * @swagger
//  * /account/create/:name/:email/:passsword:
//  *   post:
//  *     description: create user account
//  *     parameters:
//  *     - name: users
//  *       description: user we want to create
//  *       in: body
//  *       schema:
//  *         JSON-ref: #swagger.json/definitions/user              
//  *     responses:
//  *          200:
//  *             description: success
//  */
                
        // create user account
            app.get('/account/create/:name/:email/:password', function (req, res) {
            
            // check if account exists
            dal.find(req.params.email).
            then((users) => {
                
                // if user exists, return error message
                if(users.length > 0){
                    console.log('User already exists');
                    res.send("user exists");    
                }
                else{
                    // else create user
                    dal.create(req.params.name,req.params.email,req.params.password).
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
                if(user.length > 0){
                    if (user[0].password === req.params.password){
                        res.send(user[0]);
                    }
                    else{
                        res.send('Login failed: wrong password');
                    }
                }
                else{
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
        app.get('/account/update/:email/:amount', function(req, res) {
            
            var amount = Number(req.params.amount);
            
            dal.update(req.params.email, amount).
            then((response) => {
                console.log(response);
                res.send(response);
            }); 
        });
        
        // /**
        //  *  @swagger 
        //  * /account/all: 
        //  *     get:
        //  *       description: all users
        //  *       responses:
        //  *          200:
        //  *            description: success
        //  */

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