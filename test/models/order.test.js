const expect = require( 'chai' ).expect;
const Order = require( '../../models/order' );

describe( 'order model test', () => {
	it( 'schema', done => {
		let order = new Order();

		order.validate( err => {
			expect( err.errors.name ).to.to.not.exist;
			expect( err.errors.address ).to.not.exist;
			expect( err.errors.cart ).to.exist;
			done();
		} )
	} );
} );