const sinon = require( 'sinon' );
const controller = require( '../../controllers/cart' );
const Product = require( '../../models/product' );
const Cart = require( '../../models/cart' );

const sandbox = sinon.sandbox.create();

describe( 'cart controller test', () => {
	let product = { id: 'dummy' };
	let cart = { totalPrice: 100 };

	afterEach( function () {
		sandbox.restore();
	} );

	it( 'add to cart', () => {
		sandbox.stub( Cart.prototype, 'add' );
		sandbox.stub( Product, 'findById' );

		let req = { params: { id: 'dummy', qty: 10 }, session: {} };
		let res = { redirect: sandbox.stub() };

		Product.findById.yields( null, product );
		controller.addToCart( req, res );

		sandbox.assert.calledWith( Cart.prototype.add, product, req.params.id, req.params.qty );
		sandbox.assert.calledWith( res.redirect, '/' );
	} );

	it( 'show cart with empty cart', () => {
		let req = { params: {}, session: {} };
		let res = { render: sandbox.stub() };

		controller.showCart( req, res );

		sandbox.assert.calledWith( res.render, 'cart', { products: null } );
	} );

	it( 'show cart', () => {
		sandbox.stub( Cart.prototype, 'toArray' );

		let req = { params: {}, session: { cart: cart } };
		let res = { render: sinon.stub() };

		Cart.prototype.toArray.returns( [ product ] );
		controller.showCart( req, res );

		sandbox.assert.calledWith( res.render, 'cart', {
			products: [ product ],
			totalPrice: cart.totalPrice
		} );
	} );

	it( 'update cart', () => {
		sandbox.stub( Cart.prototype, 'update' );

		let req = { params: { id: 'dummy', qty: 10 }, session: { cart: cart } };
		let res = { redirect: sandbox.stub() };

		controller.updateCart( req, res );

		sandbox.assert.calledWith( Cart.prototype.update, req.params.id, req.params.qty );
		sandbox.assert.calledWith( res.redirect, '/cart' );
	} );

	it( 'remove from cart', () => {
		sandbox.stub( Cart.prototype, 'remove' );

		let req = { params: { id: 'dummy' }, session: { cart: cart } };
		let res = { redirect: sandbox.stub() };

		controller.removeFromCart( req, res );

		sandbox.assert.calledWith( Cart.prototype.remove, req.params.id );
		sandbox.assert.calledWith( res.redirect, '/cart' );
	} );
} );