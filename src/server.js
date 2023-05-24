

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { routerCart } from './routes/carts.router.js';
import { routerCategories } from './routes/categories.router.js';
import { routerProducts } from './routes/products.router.js';
import { routerUsers } from './routes/users.router.js';

dotenv.config();

const app = express();
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

const PORT = process.env.REACT_APP_PORT || 8080;

if ( !PORT ) {
    console.error( 'Missing environment variables' );
    process.exit( 1 );
}

app.use( routerCart );
app.use( routerCategories );
app.use( routerProducts );
app.use( routerUsers );

app.listen( PORT, () => {
    console.log( `Server running on port => ${PORT} 🤓` );
} );