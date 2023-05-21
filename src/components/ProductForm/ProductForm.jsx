

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

    const handleDelete = async ( product ) => {
        try {
            await axios.delete( `/api/products/${product.id}` );
            fetchProducts();
        } catch ( error ) {
            console.error( error );
        }
    };

    const handleEdit = ( product ) => {
        setTitle( product.title );
        setDescription( product.description );
        setPrice( product.price );
        setSelectedProduct( product );
    };

    const handleShowAllProducts = async () => {
        fetchProducts();
    };

    return (
        <div className="products-container">
            <form className="products-form" onSubmit={handleSubmit}>
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

            <form className="products-form" onSubmit={handleShowAllProducts}>
                <button type="submit">Show All Products</button>
            </form>

            <ul>
                {products.map( ( product ) => (
                    <li key={product.id}>
                        {product.title} - {product.description} - {product.price}
                        <button onClick={() => handleEdit( product )}>Edit</button>
                        <button onClick={() => handleDelete( product )}>Delete</button>
                    </li>
                ) )}
            </ul>
        </div>
    );
};
