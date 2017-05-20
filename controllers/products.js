const Product = require( '../models/product' );

module.exports.showProducts = function ( req, res ) {
	Product.find( ( err, products ) => {
		if ( err ) {
			return console.log( err );
		}

		res.render( 'products', {
			title: 'Shop',
			products: products
		} );
	} );
};
