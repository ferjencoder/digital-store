

import { Router } from 'express';
import CategoriesManager from '../classes/CategoriesManager.class.js';

export const routerCategories = Router();
const categoriesManager = new CategoriesManager();

// Get all categories
routerCategories.get( '/api/categories', async ( req, res, next ) => {
    try {
        const categories = await categoriesManager.getCategories();
        res.json( categories );
    } catch ( error ) {
        next( error );
    }
} );

// Get a specific category
routerCategories.get( '/api/categories/:category', async ( req, res, next ) => {
    try {
        const category = await categoriesManager.getCategory( req.params.category );
        if ( category ) {
            res.json( category );
        } else {
            res.status( 404 ).json( { message: 'Category not found' } );
        }
    } catch ( error ) {
        next( error );
    }
} );

// Create a new category
routerCategories.post( '/api/categories', async ( req, res, next ) => {
    try {
        const newCategory = await categoriesManager.createCategory( req.body.category );
        res.status( 201 ).json( newCategory );
    } catch ( error ) {
        if ( error.message === 'Category already exists' ) {
            res.status( 409 ).json( { message: error.message } );
        } else {
            next( error );
        }
    }
} );

// Delete a category
routerCategories.delete( '/api/categories/:category', async ( req, res, next ) => {
    try {
        const deletedCategory = await categoriesManager.deleteCategory( req.params.category );
        if ( deletedCategory ) {
            res.json( { message: 'Category deleted' } );
        } else {
            res.status( 404 ).json( { message: 'Category not found' } );
        }
    } catch ( error ) {
        next( error );
    }
} );
