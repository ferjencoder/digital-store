

import { Router } from 'express';
import CartManager from '../controllers/cartControllers.js';

//const routerCart = Router();
export const routerCart = Router();

const cartManager = new CartManager();

routerCart.post( '/api/cart', async ( req, res ) => {
    try {
        const newCart = await cartManager.createCart();
        res.status( 201 ).json( newCart );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerCart.get( '/api/cart/:cid', async ( req, res ) => {
    try {
        const cart = await cartManager.getCart( req.params.cid );
        res.json( cart );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerCart.post( '/api/cart/:cid/products/:pid', async ( req, res ) => {
    try {
        const updatedCart = await cartManager.addProduct( req.params.cid, req.params.pid );
        res.json( updatedCart );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

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