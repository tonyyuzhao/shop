const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const handlebars = require( 'express-handlebars' );
const mongoose = require( 'mongoose' );

const index = require( './routes/index' );
const app = express();

mongoose.connect( 'mongodb://localhost:27017/shop' );

// view engine setup
app.engine( 'handlebars', handlebars( { defaultLayout: 'main' } ) );
app.set( 'view engine', 'handlebars' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'combined' ),
	bodyParser.json(),
	bodyParser.urlencoded( { extended: false } ),
	express.static( path.join( __dirname, 'public' ) )
);

app.use( '/', index );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	let err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handler
app.use( ( err, req, res ) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

	// render the error page
	res.status( err.status || 500 );
	res.render( 'error' );
} );

module.exports = app;
