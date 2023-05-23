

import { Router } from 'express';
import CartManager from '../controllers/cartControllers.js';

export const routerCart = Router();

const cartManager = new CartManager();

// POST /api/carts/
routerCart.post( '/api/carts/', async ( req, res ) => {
    try {
        const newCart = await cartManager.createCart();
        res.status( 201 ).json( newCart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to create cart' } );
    }
} );
// GET /api/carts/
routerCart.get( '/api/carts/', async ( req, res ) => {
    try {
        const allCarts = await cartManager.getCarts();
        res.status( 201 ).json( allCarts );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to find carts' } );
    }
} );

// GET /api/carts/:cid
routerCart.get( '/api/carts/:cid', async ( req, res ) => {

    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById( cid );

        res.json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to fetch cart' } );
    };

} );

// POST /api/carts/:cid/product/:pid
routerCart.post( '/api/carts/:cid/product/:pid', async ( req, res ) => {

    try {
        console.log( req.params );

        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart( cid, pid );
        console.log( cart );

        res.json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to add product to cart' } );
    };

} );
