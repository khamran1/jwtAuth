/**
 * Created by Hamid Ali on 5/22/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var path = require('path');
var faker = require('faker');
var cors = require('cors');
var config = require('./config');

var userCredentials = {
    username:'kami',
    password:'kaka'
};

var app = express();
//app.use(expressJwt({ secret: config.secret}).unless({path: ['/signin','/','/users']}));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port',process.env.PORT || 3000);
var staticPath = path.resolve(__dirname,'public');
app.use(express.static(__dirname));
app.use(express.static(staticPath));
app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    if(req.originalUrl=='/signin'){
        next();
    }else if(token){
        jwt.verify(token,config.secret, function (err,decode) {
            if(err){
                return res.json({success: false, message:"Failed to authenticate Token "+err.message})
            }else{
                req.decode = decode;
                next();
            }
        })
    }else{
        return res.status(403).send({
            success: false,
            message: 'No Token Provided'
        })
    }
});

app.get('/', function (req, res) {
    var indexStatic = path.resolve(__dirname,'public/index.html');
    res.sendFile(indexStatic);
});
app.post('/signin', function (req, res) {
    if(req.body.username == userCredentials.username && req.body.password == userCredentials.password){
        var token = jwt.sign({
            username: req.body.username
        },config.secret,{expiresIn:999999});
        res.json(token);
    }
});

app.get('/users', function (req, res) {
    var user = faker.helpers.userCard();
    res.json(user);
});

app.listen(app.get('port'),function(){
    //console.log('app is running');
});