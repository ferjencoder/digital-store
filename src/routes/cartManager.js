

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const CART_FILE_PATH = path.resolve( __dirname, '../data/cart.json' );


export default class CartManager {

    async getProducts ( num ) {
        if ( fs.existsSync( CART_FILE_PATH ) ) {

            try {
                const data = await fs.promises.readFile( CART_FILE_PATH, 'utf-8' );
                const products = JSON.parse( data );

                console.log( products );


                if ( num !== undefined ) {
                    return products.slice( 0, num );
                };

                return products;

            } catch ( error ) {
                console.error( 'Error => reading the products file 👩🏻‍💻:', error );
                return [];
            }

        } else {
            console.warn( `${CART_FILE_PATH} , doesn't exist 🔍` );
            return [];
        }
    };

    async addProduct ( title, category, code, demoUrl, shortDescription, description, thumbnails, techStack, stock, price ) {

        if ( !title || !category || !code || !demoUrl || !shortDescription || !description || !thumbnails || !techStack || stock === undefined || price === undefined ) {
            throw new Error( `Missing product mandatory info ℹ️ (title, category, code, shortDescription, description, thumbnails, demoUrl, techStack, stock, price )` );
        }

        const products = await this.getProducts();

        const newProduct = {
            id: Math.max( ...products.map( p => p.id ) ) + 1, // ensure unique id
            title,
            category,
            code,
            shortDescription,
            description,
            thumbnails,
            demoUrl,
            techStack,
            stock,
            price
        };

        products.push( newProduct );

        try {
            await fs.promises.writeFile( CART_FILE_PATH, JSON.stringify( products, null, '\t' ) );
        } catch ( err ) {
            console.error( 'Failed to write to file:', err );
            throw new Error( 'Failed to save product' );
        }
    };
    async addProduct ( product ) {
        const { title, category, code, demoUrl, shortDescription, description, thumbnails, techStack, stock, price } = product;

        if ( !title || !category || !code || !demoUrl || !shortDescription || !description || !thumbnails || !techStack || stock === undefined || price === undefined ) {
            throw new Error( `Missing product mandatory info ℹ️ (title, category, code, shortDescription, description, thumbnails, demoUrl, techStack, stock, price)` );
        }

        const products = await this.getProducts();

        const newProduct = {
            id: Math.max( ...products.map( p => p.id ) ) + 1, // ensure unique id
            title,
            category,
            code,
            shortDescription,
            description,
            thumbnails,
            demoUrl,
            techStack,
            stock,
            price
        };

        products.push( newProduct );

        try {
            await fs.promises.writeFile( CART_FILE_PATH, JSON.stringify( products, null, '\t' ) );
        } catch ( err ) {
            console.error( 'Failed to write to file:', err );
            throw new Error( 'Failed to save product' );
        }

        return newProduct;
    };


    async updateProduct ( id, productData ) {
        const products = await this.getProducts();

        const productIndex = products.findIndex( product => product.id === id );

        if ( productIndex === -1 ) {
            return null;
        }

        const updatedProduct = { ...products[ productIndex ], ...productData, id };

        products[ productIndex ] = updatedProduct;

        await fs.promises.writeFile( CART_FILE_PATH, JSON.stringify( products, null, '\t' ) );

        return updatedProduct;
    };


    async deleteProduct ( id ) {
        const products = await this.getProducts();
        const filteredProducts = products.filter( product => product.id !== id );

        if ( products.length === filteredProducts.length ) {
            throw new Error( `Product with id ${id} not found 😥` );
        }

        try {
            await fs.promises.writeFile( CART_FILE_PATH, JSON.stringify( filteredProducts, null, '\t' ) );
        } catch ( error ) {
            console.error( 'Error writing to file 👩🏻‍💻:', error );
            throw error;
        }
    };

    async getProductsByCategory ( category ) {

        const products = await this.getProducts();
        return products.filter( ( product ) => product.category === category );

    };

    async getProductById ( id ) {

        const products = await this.getProducts();
        const searchedProduct = products.find( product => product.id === id );

        if ( !searchedProduct ) {
            throw new Error( 'Product not found 🤕' );
        }

        return searchedProduct;
    };

};