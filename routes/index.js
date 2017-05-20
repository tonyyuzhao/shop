const express = require( "express" );
const router = express.Router();

const products = require( "../controllers/products" );
const cart = require( "../controllers/cart" );
const checkout = require( "../controllers/checkout" );

router.get( '/', products.showProducts );
router.get( '/add-to-cart/:id/:qty', cart.addToCart );
router.get( '/cart', cart.showCart );
router.get( '/update-cart/:id/:qty', cart.updateCart );
router.get( '/remove-from-cart/:id', cart.removeFromCart );
router.get( '/checkout', checkout.placeOrder );

module.exports = router;