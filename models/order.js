const mongoose = require( 'mongoose' );

module.exports = mongoose.model( 'Order', mongoose.Schema( {
	user: { type: mongoose.Schema.Types.ObjectId },
	address: { type: String },
	cart: { type: Object, required: true }
} ) );