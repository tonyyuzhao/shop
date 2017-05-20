const expect = require( 'chai' ).expect;
const Cart = require( '../../models/cart' );

describe( 'cart model test', () => {
	beforeEach( () => {
		this.item = {
			id: '1',
			price: 10
		};
		this.newCart = new Cart( {} );
		this.existingCart = new Cart( {} );
		this.existingCart.add( this.item, this.item.id, 1 );
	} );

	it( 'new cart is empty', done => {
		expect( this.newCart.items ).to.be.an( 'object' ).and.to.be.empty;
		expect( this.newCart.totalQty ).to.equal( 0 );
		expect( this.newCart.totalPrice ).to.equal( 0 );
		done();
	} );

	it( 'add item to new cart', done => {
		this.newCart.add( this.item, this.item.id, 1 );

		expect( this.newCart.items ).to.have.keys( this.item.id );
		expect( this.newCart.items[ this.item.id ] ).to.deep.equal( {
			item: this.item,
			qty: 1,
			price: this.item.price
		} );
		expect( this.newCart.totalQty ).to.equal( 1 );
		expect( this.newCart.totalPrice ).to.equal( this.item.price );
		done();
	} );

	it( 'add multiple items to new cart', done => {
		this.newCart.add( this.item, this.item.id, 10 );

		expect( this.newCart.items ).to.have.keys( this.item.id );
		expect( this.newCart.items[ this.item.id ] ).to.deep.equal( {
			item: this.item,
			qty: 10,
			price: this.item.price * 10
		} );
		expect( this.newCart.totalQty ).to.equal( 10 );
		expect( this.newCart.totalPrice ).to.equal( this.item.price * 10 );
		done();
	} );

	it( 'add items to existing cart', done => {
		let anotherItem = {
			id: '2',
			price: 20
		};

		this.existingCart.add( anotherItem, anotherItem.id, 1 );

		expect( this.existingCart.items ).to.have.keys( this.item.id, anotherItem.id );
		expect( this.existingCart.items[ anotherItem.id ] ).to.deep.equal( {
			item: anotherItem,
			qty: 1,
			price: anotherItem.price
		} );
		expect( this.existingCart.totalQty ).to.equal( 2 );
		expect( this.existingCart.totalPrice ).to.equal( this.item.price + anotherItem.price );
		done();
	} );

	it( 'update items', done => {
		this.existingCart.update( this.item.id, 5 );

		expect( this.existingCart.items ).to.have.keys( this.item.id );
		expect( this.existingCart.items[ this.item.id ] ).to.deep.equal( {
			item: this.item,
			qty: 5,
			price: this.item.price * 5
		} );
		expect( this.existingCart.totalQty ).to.equal( 5 );
		expect( this.existingCart.totalPrice ).to.equal( this.item.price * 5 );
		done();
	} );

	it( 'update items will remove item if qty is 0', done => {
		this.existingCart.update( this.item.id, 0 );

		expect( this.existingCart.items ).to.not.have.keys( this.item.id );
		expect( this.existingCart.totalQty ).to.equal( 0 );
		expect( this.existingCart.totalPrice ).to.equal( 0 );
		done();
	} );

	it( 'remove items', done => {
		this.existingCart.remove( this.item.id );

		expect( this.existingCart.items ).to.not.have.keys( this.item.id );
		expect( this.existingCart.totalQty ).to.equal( 0 );
		expect( this.existingCart.totalPrice ).to.equal( 0 );
		done();
	} );

	it( 'to array', done => {
		let item = {
			id: '1',
			price: 10
		};
		let item2 = {
			id: '2',
			price: 20
		};
		let cart = new Cart( {} );

		cart.add( item, item.id, 5 );
		cart.add( item2, item2.id, 10 );

		expect( cart.toArray() ).to.deep.equal( [
			{ item: { id: '1', price: 10 }, qty: 5, price: 50 },
			{ item: { id: '2', price: 20 }, qty: 10, price: 200 }
		] );
		done();
	} );
} );