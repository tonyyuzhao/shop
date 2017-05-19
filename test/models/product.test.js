const expect = require( 'chai' ).expect;
const Product = require( '../../models/product' );

describe( 'Product schema test', () => {
	it( 'imageUrl, name, description, price fields are required', done => {
		let product = new Product();

		product.validate( err => {
			expect( err.errors.imageUrl ).to.exist;
			expect( err.errors.name ).to.exist;
			expect( err.errors.description ).to.exist;
			expect( err.errors.price ).to.exist;
			done();
		} )
	} );
} );