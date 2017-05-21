const expect = require( 'chai' ).expect;
const Product = require( '../../models/product' );

describe( 'product model test', () => {
	it( 'schema', done => {
		let product = new Product();

		product.validate( err => {
			expect( err.errors.imageUrl ).to.exist;
			expect( err.errors.name ).to.exist;
			expect( err.errors.description ).to.exist;
			expect( err.errors.price ).to.exist;
			done();
		} )
	} );

	it( 'price must be non-negative', done => {
		let product = new Product( { imageUrl: 'dummy', name: 'dummy', description: 'dummy', price: -1 } );

		product.validate( err => {
			expect( err.errors.price ).to.exist;
			done();
		} )
	} );
} );