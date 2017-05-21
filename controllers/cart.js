const Cart = require( '../models/cart' );
const Product = require( '../models/product' );
const Order = require( '../models/order' );

module.exports.addToCart = function ( req, res ) {
	let productId = req.params.id;
	let qty = Number( req.params.qty );
	let cart = new Cart( req.session.cart ? req.session.cart : {} );

	Product.findById( productId, ( err, product ) => {
		if ( err ) {
			console.log( err );
			return res.redirect( '/' );
		}
		cart.add( product, product.id, qty );
		req.session.cart = cart;
		res.redirect( '/' );
	} );
};

module.exports.showCart = function ( req, res ) {
	if ( !req.session.cart ) {
		return res.render( 'cart', { products: null } );
	}
	let cart = new Cart( req.session.cart );
	let errors = req.flash( 'error' );

	res.render( 'cart', {
		products: cart.toArray(),
		totalPrice: cart.totalPrice,
		errors: errors,
		hasErrors: errors.length > 0
	} );
};

module.exports.updateCart = function ( req, res ) {
	if ( invalidQty( req ) ) {
		return res.redirect( '/cart' );
	}

	if ( !req.session.cart ) {
		return res.render( 'cart', { products: null } );
	}

	let productId = req.params.id;
	let qty = Number( req.params.qty );
	let cart = new Cart( req.session.cart );

	try {
		cart.update( productId, qty );
	} catch ( err ) {
		req.flash( 'error', [ err ] );
		return res.redirect( '/cart' );
	}

	req.session.cart = cart;
	res.redirect( '/cart' );
};

module.exports.removeFromCart = function ( req, res ) {
	if ( !req.session.cart ) {
		return res.render( 'cart', { products: null } );
	}

	let productId = req.params.id;
	let cart = new Cart( req.session.cart );

	try {
		cart.remove( productId );
	} catch ( err ) {
		req.flash( 'error', [ err ] );
		return res.redirect( '/cart' );
	}

	req.session.cart = cart;
	res.redirect( '/cart' );
};

module.exports.checkout = function ( req, res ) {
	if ( !req.session.cart ) {
		return res.render( 'cart', { products: null } );
	}

	let cart = new Cart( req.session.cart );
	let order = new Order( {
		cart: cart
	} );
	order.save( err => {
		if ( err ) {
			console.log( err );
			return res.redirect( '/cart' );
		}
		req.session.cart = null;
		res.render( 'checkout', { products: cart.toArray(), totalPrice: cart.totalPrice } );
	} )
};

function invalidQty( req ) {
	req.checkParams( 'qty', 'Invalid quantity' ).isInt( { min: 1 } );
	let errors = req.validationErrors();
	if ( errors ) {
		let messages = [];
		errors.forEach( error => {
			messages.push( error.msg );
		} );
		req.flash( 'error', messages );
		return true;
	}
	return false;
}