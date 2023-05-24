

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const CATEGORIES_FILE_PATH = path.resolve( __dirname, '../data/categories.json' );

export default class CategoriesManager {

    async getCategories () {

        if ( fs.existsSync( CATEGORIES_FILE_PATH ) ) {
            const data = await fs.promises.readFile( CATEGORIES_FILE_PATH, 'utf-8' );
            const categories = JSON.parse( data );
            return categories;

        } else {
            return [];
        };

    };

    async createCategory ( category ) {

        const categories = await this.getCategories();

        // Check if the category already exists
        if ( categories.includes( category ) ) {
            throw new Error( 'Category already exists' );
        }

        categories.push( category );
        await fs.promises.writeFile( CATEGORIES_FILE_PATH, JSON.stringify( categories, null, '\t' ) );
    };

    async deleteCategory ( category ) {

        const categories = await this.getCategories();

        const filteredCategories = categories.filter( ( existingCategory ) => {
            return existingCategory !== category;
        } );

        await fs.promises.writeFile( CATEGORIES_FILE_PATH, JSON.stringify( filteredCategories, null, '\t' ) );
    };

    async getCategory ( category ) {

        const categories = await this.getCategories();

        const exists = categories.includes( category );

        return exists ? category : 'Category Not Found';

    };
};
