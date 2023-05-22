

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath( import.meta.url );
export const __dirname = dirname( __filename );

//const PRODUCTS_FILE_PATH = path.resolve( __dirname, '../data/products.json' );

const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, __dirname + '/public/images' )
    },
    filename: function ( req, file, cb ) {
        cb( null, Date.now() + '-' + file.originalname )
    }
} );

export const uploader = multer( {
    storage, onError: function ( err, next ) {
        console.log( err );
        next();

    }
} );

