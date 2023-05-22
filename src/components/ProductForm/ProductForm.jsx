

import { useState, useEffect } from 'react';
import axios from 'axios';


export const ProductForm = () => {

    const [ products, setProducts ] = useState( [] );
    const [ title, setTitle ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ selectedProduct, setSelectedProduct ] = useState( null );

    useEffect( () => {

        fetchProducts();

    }, [] );

    const fetchProducts = async () => {
        try {
            const response = await axios.get( '/api/products' );
            setProducts( response.data );
            console.log( '', products );
            console.log( 'products', products );

        } catch ( error ) {
            console.error( error );
        }
    };

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        if ( selectedProduct ) {
            await axios.put( `/api/products/${selectedProduct.id}`, {
                title,
                description,
                price,
            } );
        } else {
            await axios.post( '/api/products', { title, description, price } );
        }

        setTitle( '' );
        setDescription( '' );
        setPrice( '' );
        setSelectedProduct( null );
        fetchProducts();
    };

    return (

        <form className="products-section" onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={( e ) => setTitle( e.target.value )}
                placeholder="Title"
                required
            />
            <input
                value={description}
                onChange={( e ) => setDescription( e.target.value )}
                placeholder="Description"
                required
            />
            <input
                value={price}
                onChange={( e ) => setPrice( e.target.value )}
                placeholder="Price"
                required
            />
            <button type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
        </form>

    );
};
