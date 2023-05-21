

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { routerProducts } from './routes/products.router.js';
import { routerCart } from './routes/cart.router.js';

dotenv.config();

const app = express();
app.use( cors() );
app.use( express.json() ); // Used to parse JSON bodies

const PORT = process.env.PORT || 8080;

if ( !PORT ) {
    console.error( 'Missing environment variables' );
    process.exit( 1 );
}

app.use( '/api/products', routerProducts );
app.use( '/api/cart', routerCart );

app.listen( PORT, () => {
    console.log( `Server running on port => ${PORT} 🤓` );
} );


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import { routerProducts } from './routes/products.router.js';

// import { __dirname } from './utils/utils.js';

// // import { routerCart } from './routes/cart.router.js';
// // import { routerUsers } from './routes/users.router.js';

// dotenv.config();

// export const app = express();
// app.use( cors() );
// app.use( express.json() ); // Used to parse JSON bodies
// app.use( express.urlencoded( { extended: true } ) );

// app.use( express.static( __dirname + '/public' ) );

// const PORT = process.env.PORT; // || 8080

// if ( !PORT ) {
//     console.error( "Missing environment variables" );
//     process.exit( 1 );
// }

// app.use( '/api/products', routerProducts );

// app.listen( PORT, () => {
//     console.log( `Server running on port => ${PORT} 🤓` );
// } );