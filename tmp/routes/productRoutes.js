

import fs from 'fs';
// import products from '../files/products.json'

const PRODUCTS_FILE_PATH = '../files/products.json';

export default class ProductManager {

    async getProducts ( num ) {
        try {

            const products = await this._readFromFile();

            return products.slice( 0, num ?? products.length );

        } catch ( error ) {
            if ( error.code === 'ENOENT' ) {

                throw new Error( `${PRODUCTS_FILE_PATH} does not exist` );

            } else {
                throw new Error( `Error => reading the products file: ${error.message}` );
            }
        }
    };

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
            await this._writeToFile( products );
        } catch ( err ) {
            throw new Error( 'Failed to save product' );
        }

        return newProduct;
    };

    async updateProduct ( id, productData ) {
        let products = await this._readFromFile();

        const productIndex = products.findIndex( product => product.id === id );

        if ( productIndex === -1 ) {
            console.error( `Product with id ${id} not found 😥` );
            return null; // No product was updated
        }

        const updatedProduct = { ...products[ productIndex ], ...productData, id };

        products[ productIndex ] = updatedProduct;

        try {
            await this._writeToFile( products );
        } catch ( error ) {
            console.error( 'Error writing to file:', error );
            throw error;
        }

        return updatedProduct;
    };

    async deleteProduct ( id ) {
        try {
            await this._findProductById( id );
        } catch ( error ) {
            console.error( `Product with id ${id} not found 😥` );
            return false; // No product was deleted
        }

        let products = await this._readFromFile();

        products = products.filter( product => product.id !== id );

        try {
            await this._writeToFile( products );
        } catch ( error ) {
            console.error( 'Error writing to file:', error );
            throw error;
        }

        return true; // A product was deleted
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

    // Other methods...
    async _readFromFile () {
        try {

            console.log( PRODUCTS_FILE_PATH );

            const data = await fs.promises.readFile( PRODUCTS_FILE_PATH, 'utf-8' );

            if ( !data || data.trim() === '' ) {
                throw new Error( `${PRODUCTS_FILE_PATH} is empty` );
            }

            return data;

        } catch ( error ) {
            if ( error.code === 'ENOENT' ) {
                throw new Error( `${PRODUCTS_FILE_PATH} does not exist` );
            } else {
                throw new Error( `Error reading the products file: ${error.message}` );
            }
        }

    };

    async _writeToFile ( data ) {

        try {
            const stringifiedData = JSON.stringify( data, null, '\t' );
            await fs.promises.writeFile( PRODUCTS_FILE_PATH, stringifiedData );

        } catch ( error ) {

            throw new Error( `Error writing the products file: ${error.message}` );
        }
    };

    async _findProductById ( id ) {
        const products = await this._readFromFile();

        const product = products.find( product => product.id === id );

        if ( !product ) {
            throw new Error( 'Product not found' );
        }

        return product;
    };

};
