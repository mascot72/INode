var express = require('express');
var app = express();
var user = require('./routes/user');

app.use('/user', user);

app.use('/', express.static('public'));

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000, function(){
    console.log('Example App is listening on port 3000');
});