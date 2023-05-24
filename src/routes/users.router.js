

import { Router } from 'express';
import UsersManager from '../classes/UsersManager.class.js';


export const routerUsers = Router();

const usersManager = new UsersManager();

routerUsers.get( '/api/users', async ( req, res ) => {

    try {
        const users = await getUsers();
        res.json( users );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.post( '/api/user', async ( req, res ) => {

    try {
        const newUser = req.body;
        await createUser( newUser );
        res.status( 201 ).json( { message: 'User created successfully' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.delete( '/api/user/:id', async ( req, res ) => {

    try {
        const userId = req.params.id;
        await deleteUser( userId );
        res.json( { message: 'User deleted successfully' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.get( '/api/user/:id', async ( req, res ) => {

    try {
        const userId = req.params.id;
        const user = await getUserById( userId );
        res.json( user );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

// module.exports = routerUsers;