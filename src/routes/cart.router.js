

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

        if ( cart ) {
            res.json( cart.products );
        } else {
            res.status( 404 ).json( { error: 'Cart not found' } );
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to fetch cart' } );
    }
} );

// POST /api/carts/:cid/product/:pid
routerCart.post( '/api/carts/:cid/product/:pid', async ( req, res ) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart( cid, pid );
        res.json( cart );
    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to add product to cart' } );
    }
} );

// routerCart.post( '/api/cart', async ( req, res ) => {

//     try {
//         const newCart = await cartManager.createCart();
//         res.status( 201 ).json( newCart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );

// routerCart.get( '/api/cart/:cid', async ( req, res ) => {

//     try {
//         const cart = await cartManager.getCart( req.params.cid );
//         res.json( cart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );

// routerCart.post( '/api/cart/:cid/products/:pid', async ( req, res ) => {

//     try {
//         const updatedCart = await cartManager.addProduct( req.params.cid, req.params.pid );
//         res.json( updatedCart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );

//module.exports = routerCart;

// import { Router } from 'express';
// import CartManager from './cartManager.js';

// export const routerCart = Router();

// //const cart = [];

// // Routes for /cart
// const cartManager = new CartManager();

// routerCart.post( "/api/cart", async ( req, res ) => {

//     try {
//         const newCart = await cartManager.createCart();
//         res.status( 201 ).json( newCart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );

// routerCart.get( "/api/cart/:cid", async ( req, res ) => {

//     try {
//         const cart = await cartManager.getCart( req.params.cid );
//         res.json( cart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );

// routerCart.post( "/api/cart/:cid/products/:pid", async ( req, res ) => {

//     try {
//         const updatedCart = await cartManager.addProduct( req.params.cid, req.params.pid );
//         res.json( updatedCart );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     };

// } );