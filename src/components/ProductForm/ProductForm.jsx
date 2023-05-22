

import { useState, useEffect } from 'react';
import axios from 'axios';
// import { priceInARS } from '../../utils/utils';


export const ProductForm = () => {

    const [ products, setProducts ] = useState( [] );
    const [ title, setTitle ] = useState( '' );
    const [ category, setCategory ] = useState( '' );
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
                category,
                description,
                price,
            } );
        } else {
            await axios.post( '/api/products', { title, description, price } );
        }

        setTitle( '' );
        setCategory( '' );
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
                value={category}
                onChange={( e ) => setCategory( e.target.value )}
                placeholder="Category"
                required
            >
            </input>
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
            <button
                className='btn-success'
                type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
        </form>

    );
};
