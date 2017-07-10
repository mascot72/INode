/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config');
const port = process.env.PORT || 3001;

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT');
});

// configure api router
app.use('/api', require('./routes/api'));

app.use('/public', express.static('public'));
app.use('/js', express.static('js'));

// Error 처리
// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   next(err);
// });
// app.use(function(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500);
//   res.render('error', { error: err });
// });
var errorHandler = require('express-error-handler'),
  handler = errorHandler({
    static: {
      '404': 'public/404.html'
    }
}); 

// After all your routes...
// Pass a 404 into next(err)
app.use( errorHandler.httpError(404) );
// Handle all unhandled errors:
app.use( handler );



// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});



/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    console.log('connected to mongodb server');
});

