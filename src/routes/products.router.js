

import { Router } from 'express';
import ProductManager from './productsManager.js';

export const routerProducts = Router();

const productManager = new ProductManager();

routerProducts.get( '/api/products', async ( req, res ) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts( limit );
        res.status( 200 ).json( products );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerProducts.get( '/api/products/:pid', async ( req, res ) => {
    try {
        const product = await productManager.getProductById( req.params.pid );
        if ( !product ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( product );
        }
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerProducts.post( '/api/products', async ( req, res ) => {
    try {
        const newProduct = await productManager.addProduct( req.body );
        res.status( 201 ).json( newProduct );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerProducts.put( '/api/products/:pid', async ( req, res ) => {
    try {
        const updatedProduct = await productManager.updateProduct( req.params.pid, req.body );
        if ( !updatedProduct ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( updatedProduct );
        }
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );

routerProducts.delete( '/api/products/:pid', async ( req, res ) => {
    try {
        const deleted = await productManager.deleteProduct( req.params.pid );
        if ( !deleted ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( { status: 'success', message: 'Product deleted' } );
        }
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }
} );


// import cors from 'cors';
// import { Router } from 'express';
// import ProductManager from './productsManager.js';


// export const routerProducts = Router();

// const productManager = new ProductManager();

// // app.use( cors() );
// // app.use( '/api', routerProducts );

// // Routes for /products
// routerProducts.get( "/api/products", async ( req, res ) => {

//     try {

//         const limit = req.query.limit;
//         const products = await productManager.getProducts( limit );

//         res.status( 200 ).json( products );

//     } catch ( error ) {

//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     }
// } );

// routerProducts.get( "/api/products/:pid", async ( req, res ) => {
//     try {
//         const product = await productManager.getProductById( req.params.pid );
//         if ( !product ) {
//             res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
//         } else {
//             res.json( product );
//         }
//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     }
// } );

// routerProducts.post( "/api/products", async ( req, res ) => {

//     try {
//         const newProduct = await productManager.addProduct( req.body );
//         res.status( 201 ).json( newProduct );

//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     }
// } );

// routerProducts.put( "/api/products/:pid", async ( req, res ) => {
//     try {
//         const updatedProduct = await productManager.updateProduct( req.params.pid, req.body );

//         if ( !updatedProduct ) {

//             res.status( 404 ).send( { status: 'error', error: 'Product not found' } );

//         } else {

//             res.json( updatedProduct );
//         }

//     } catch ( error ) {

//         console.error( error );
//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     }
// } );

// routerProducts.delete( "/api/products/:pid", async ( req, res ) => {
//     try {

//         const deleted = await productManager.deleteProduct( req.params.pid );

//         if ( !deleted ) {
//             res.status( 404 ).send( { status: 'error', error: 'Product not found' } );

//         } else {

//             res.json( { status: 'success', message: 'Product deleted' } );
//         }

//     } catch ( error ) {

//         console.error( error );

//         res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
//     }
// } );