

import fs from 'fs';

const CART_FILE_PATH = '../data/cart.json';

export default class CartManager {

    async createCart () {
        const carts = await this._readFromFile();

        const newCart = {
            id: Math.max( ...carts.map( c => c.id ) ) + 1,
            products: []
        };

        carts.push( newCart );
        await this._writeToFile( carts );

        return newCart;
    }

    async getCart ( id ) {
        const carts = await this._readFromFile();

        const cart = carts.find( cart => cart.id === id );
        if ( !cart ) throw new Error( `Cart with id ${id} not found` );

        return cart;
    }

    async addProductToCart ( cartId, productId, quantity = 1 ) {
        const carts = await this._readFromFile();

        const cart = carts.find( cart => cart.id === cartId );
        if ( !cart ) throw new Error( `Cart with id ${cartId} not found` );

        const product = cart.products.find( p => p.productId === productId );
        if ( product ) {
            product.quantity += quantity;
        } else {
            cart.products.push( {
                productId: productId,
                quantity: quantity
            } );
        }

        await this._writeToFile( carts );

        return cart;
    }

    async getCartProducts ( cartId ) {
        const cart = await this.getCart( cartId );
        return cart.products;
    }

    async _readFromFile () {
        const data = await fs.promises.readFile( CART_FILE_PATH, 'utf-8' );
        return JSON.parse( data );
    }

    async _writeToFile ( data ) {
        const stringifiedData = JSON.stringify( data, null, '\t' );
        await fs.promises.writeFile( CART_FILE_PATH, stringifiedData );
    }
}
