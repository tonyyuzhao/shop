const Cart = require( '../models/cart' );
const Order = require( '../models/order' );

module.exports.placeOrder = function ( req, res ) {
	let cart = new Cart( req.session.cart );
	let order = new Order( {
		cart: cart
	} );
	order.save( err => {
		if ( err ) {
			return console.log( err );
		}
		req.session.cart = null;
		res.render( 'checkout', { products: cart.toArray(), totalPrice: cart.totalPrice } );
	} )
};