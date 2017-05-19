const sinon = require( 'sinon' );
const products = require( '../../controllers/products' );
const Product = require( '../../models/product' );

describe( 'products view controller test', () => {
	beforeEach( () => {
		sinon.stub( Product, 'find' );
	} );

	afterEach( () => {
		Product.find.restore();
	} );

	it( 'should render all products', () => {
		let expected = [
			{
				imageUrl: 'test url 1',
				name: 'test name 1',
				description: 'test description 1',
				price: 1.99
			},
			{
				imageUrl: 'test url 2',
				name: 'test name 2',
				description: 'test description 2',
				price: 2.99
			},
			{
				imageUrl: 'test url 3',
				name: 'test name 3',
				description: 'test description 3',
				price: 3.99
			}
		];
		let req = { params: {} };
		let res = {
			render: sinon.stub()
		};

		Product.find.yields( null, expected );
		products.showProducts( req, res );

		sinon.assert.calledWith( res.render, 'shop/products', { products: expected, title: 'Shop' } );
	} );
} );