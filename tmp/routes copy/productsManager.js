

import path from 'path';
import fs from 'fs';
import { __dirname } from '../utils/utils.js';

const PRODUCTS_FILE_PATH = path.resolve( __dirname, '../data/products.json' );


export default class ProductManager {

    async getProducts ( num ) {
        try {

            const data = await fs.promises.readFile( PRODUCTS_FILE_PATH, 'utf-8' );
            const products = JSON.parse( data );

            return products.slice( 0, num ?? products.length );

        } catch ( error ) {
            if ( error.code === 'ENOENT' ) {

                throw new Error( `${PRODUCTS_FILE_PATH} does not exist` );

            } else {
                throw new Error( `Error => reading the products file 👩🏻‍💻 ${error.message}` );
            }
        }
    }

    async addProduct ( product ) {
        const { title, category, code, demoUrl, shortDescription, description, thumbnails, techStack, stock, price } = product;

        if ( !title || !category || !code || !demoUrl || !shortDescription || !description || !thumbnails || !techStack || stock === undefined || price === undefined ) {
            throw new Error( `Missing product mandatory info (title, category, code, shortDescription, description, thumbnails, demoUrl, techStack, stock, price)` );
        }

        const products = await this.getProducts();
        const newProduct = {
            id: Math.max( ...products.map( p => p.id ) ) + 1,
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
            await fs.promises.writeFile( PRODUCTS_FILE_PATH, JSON.stringify( products, null, '\t' ) );
        } catch ( err ) {
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

        await fs.promises.writeFile( PRODUCTS_FILE_PATH, JSON.stringify( products, null, '\t' ) );

        return updatedProduct;
    };

    async deleteProduct ( id ) {
        const products = await this.getProducts();
        const filteredProducts = products.filter( product => product.id !== id );

        if ( products.length === filteredProducts.length ) {
            console.error( `Product with id ${id} not found 😥` );
            return false;  // no product was deleted
        }

        try {
            await fs.promises.writeFile( PRODUCTS_FILE_PATH, JSON.stringify( filteredProducts, null, '\t' ) );

        } catch ( error ) {
            console.error( 'Error writing to file 👩🏻‍💻:', error );
            throw error;
        }

        return true;  // a product was deleted
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
