const sinon = require( 'sinon' );
const products = require( '../../controllers/products' );
const Product = require( '../../models/product' );

const sandbox = sinon.sandbox.create();

describe( 'products controller test', () => {
	let product = { id: 'dummy' };

	afterEach( function () {
		sandbox.restore();
	} );

	it( 'show products', () => {
		sandbox.stub( Product, 'find' );

		let req = { params: {} };
		let res = { render: sinon.stub() };

		Product.find.yields( null, [ product, product, product ] );
		products.showProducts( req, res );

		sandbox.assert.calledWith( res.render, 'products', { products: [ product, product, product ], title: 'Shop' } );
	} );
} );