const sinon = require( 'sinon' );
const controller = require( '../../controllers/checkout' );
const Order = require( '../../models/order' );

const sandbox = sinon.sandbox.create();

describe.skip( 'checkout controller test', () => {
	let product = { id: 'dummy' };
	let cart = { items: { dummy: product }, totalPrice: 100 };

	afterEach( function () {
		sandbox.restore();
	} );

	it( 'place order', () => {
		sandbox.stub( Cart.prototype, 'add' );
		sandbox.stub( Order, 'save' ); //mongoose save is dynamically generated so it cannot be stubbed

		let req = { params: {}, session: { cart: cart } };
		let res = { render: sandbox.stub() };

		Order.save.yields( null );
		controller.placeOrder( req, res );

		sandbox.assert.calledWith( res.render, 'checkout', { products: [ product ], totalPrice: cart.totalPrice } );
	} );
} );