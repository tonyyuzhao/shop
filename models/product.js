const mongoose = require( 'mongoose' );

const ProductSchema = mongoose.Schema( {
	imageUrl: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true }
} );

ProductSchema.path( 'price' )
	.set( number => number.toFixed( 2 ) );

module.exports = mongoose.model( 'Product', ProductSchema );