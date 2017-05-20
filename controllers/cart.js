const Cart = require( '../models/cart' );
const Product = require( '../models/product' );

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

	res.render( 'cart', { products: cart.toArray(), totalPrice: cart.totalPrice } );
};

module.exports.updateCart = function ( req, res ) {
	let productId = req.params.id;
	let qty = Number( req.params.qty );
	let cart = new Cart( req.session.cart ? req.session.cart : {} );

	cart.update( productId, qty );
	req.session.cart = cart;
	res.redirect( '/cart' );
};

module.exports.removeFromCart = function ( req, res ) {
	let productId = req.params.id;
	let cart = new Cart( req.session.cart ? req.session.cart : {} );

	cart.remove( productId );
	req.session.cart = cart;
	res.redirect( '/cart' );
};