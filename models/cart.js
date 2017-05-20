function Cart( cart ) {
	this.items = cart.items || {};
	this.totalQty = cart.totalQty || 0;
	this.totalPrice = cart.totalPrice || 0;
}

Cart.prototype.add = function ( item, id, qty ) {
	if ( !this.items[ id ] ) {
		this.items[ id ] = { item: item, qty: 0, price: 0 };
	}

	this.items[ id ].qty += qty;
	this.items[ id ].price += this.items[ id ].item.price * qty;
	this.totalQty += qty;
	this.totalPrice += this.items[ id ].item.price * qty;
};

Cart.prototype.update = function ( id, qty ) {
	let delta = qty - this.items[ id ].qty;

	this.items[ id ].qty = qty;
	this.items[ id ].price = this.items[ id ].item.price * qty;
	this.totalQty += delta;
	this.totalPrice += this.items[ id ].item.price * delta;

	if ( this.items[ id ].qty <= 0 ) {
		delete this.items[ id ];
	}
};

Cart.prototype.remove = function ( id ) {
	this.totalQty -= this.items[ id ].qty;
	this.totalPrice -= this.items[ id ].price;

	delete this.items[ id ];
};

Cart.prototype.toArray = function () {
	let array = [];

	for ( let id in this.items ) {
		array.push( this.items[ id ] );
	}

	return array;
};

module.exports = Cart;