const async = require( 'async' );
const mongoose = require( 'mongoose' );
const Product = require( '../models/product' );

mongoose.connect( 'mongodb://localhost:27017/shop' );

Product.remove( {}, errors => {
	if ( errors ) {
		return console.log( errors );
	}
} );

let products = [
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/CHICKEN_FINAL_01-2-e1492532841295.jpg',
		name: 'P.G Cluck’s Classic',
		description: 'Juicy Nashville hot chicken gets its kick from a cayenne-infused paste before it’s layered onto a sweet-potato bun with tangy coleslaw, bread-and-butter pickles, buttermilk ranch dressing and fermented chili sauce.',
		price: 7
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/Sandwich_179-BarFancy-e1493051489854.jpg',
		name: 'Bar Fancy’s Coco Bun',
		description: 'The chicken is drizzled with honey mustard and kewpie mayo under sweet house-made pickles on a coconut milk bun.',
		price: 12
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_280-GABARDINE-1-e1493051464604.jpg',
		name: 'The Gabardine’s Classic Fried Chicken',
		description: 'Crunchy batter and super-moist bird meet sweet mayo, hot sauce, tangy dill pickles and crisp iceberg lettuce on a pillowy sesame seed bun.',
		price: 20
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_323-PORCHETTA-1-e1493051434993.jpg',
		name: 'Porchetta and Co.’s Korean Fried Chicken',
		description: 'This whopping Korean flavour bomb is drenched in sweet-and-spicy chili sauce with kimchee, lettuce, pickles, cilantro and zingy green onion–lime mayo.',
		price: 9.45
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_251-BROCK-1-e1493051403212.jpg',
		name: 'Brock Sandwich’s Spicy Chili Chicken',
		description: 'Spicy chili sauce jacks up this delightfully messy concoction, which is finished with a heap of coleslaw and fabulous charred onions.',
		price: 9
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_262-FLOCK-1-e1493051374348.jpg',
		name: 'Flock’s Fried Chicken Sammy',
		description: 'The Fried Chicken Sammy features Cory Vitiello’s fried-to-perfection poultry on a bed of crunchy slaw, slathered with avocado and hot sauce, and topped with a dill pickle spear.',
		price: 10
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_232-KitsonCo-1-e1493051344749.jpg',
		name: 'Kitson and Co.’s Kicky Chicken',
		description: 'Mayo spiked with Louisiana hot sauce is the finishing touch on this Parkdale sandwich-counter creation that stacks crispy chicken, kicky red cabbage slaw and sweet house-made pickles.',
		price: 13
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_214-BEAST-1-e1493051307916.jpg',
		name: 'Beast’s Beastwich',
		description: 'A buttermilk biscuit can barely contain the Beastwich: a fried chicken thigh with a base layer of pimento cheese, a blanket of pork sausage gravy and a runny egg.',
		price: 15
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/CHICKEN_FINAL_09-2-e1493051279446.jpg',
		name: 'The Wren’s Mr. Pong',
		description: 'Sweet-and-sour chicken is topped with grilled peppers, onions and pickled jalapeños to create Mr. Pong’s Fried Chicken sand­wich, with a splash of watercress pesto and queso fresco aÏoli.',
		price: 14
	},
	{
		imageUrl: 'http://cdn.torontolife.com/wp-content/uploads/2017/04/ChknSand_301-FEDERAL-1-e1493051248668.jpg',
		name: 'The Federal’s Old Standard',
		description: 'The heart-stopping Old Standard is coated in a fiery hot sauce, with bacon, cheddar cheese, pickles and aïoli on an English muffin.',
		price: 12
	}
];

Product.insertMany( products, ( errors, docs ) => {
	if ( errors ) {
		return console.log( errors );
	}
	mongoose.disconnect()
} );