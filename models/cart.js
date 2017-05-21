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
	this.items[ id ].price = Number( this.items[ id ].price.toFixed( 2 ) );
	this.totalQty += qty;
	this.totalPrice += this.items[ id ].item.price * qty;
	this.totalPrice = Number( this.totalPrice.toFixed( 2 ) );
};

Cart.prototype.update = function ( id, qty ) {
	if ( !this.items[ id ] ) {
		throw 'Invalid product';
	}

	let delta = qty - this.items[ id ].qty;

	this.items[ id ].qty = qty;
	this.items[ id ].price = this.items[ id ].item.price * qty;
	this.items[ id ].price = Number( this.items[ id ].price.toFixed( 2 ) );
	this.totalQty += delta;
	this.totalPrice += this.items[ id ].item.price * delta;
	this.totalPrice = Number( this.totalPrice.toFixed( 2 ) );

	if ( this.items[ id ].qty <= 0 ) {
		delete this.items[ id ];
	}
};

Cart.prototype.remove = function ( id ) {
	if ( !this.items[ id ] ) {
		throw 'Invalid product';
	}

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