

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductForm } from '../ProductForm/ProductForm';


export const ProductPage = () => {

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

    const handleShowAllProducts = async () => {
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

    return (

        <section className='productPage-container'>
            <section className='productsForm-section'>
                <ProductForm />
            </section>

            <section className='products-section'>

                <button
                    className='btn-delete ff-secondary fs-3'
                    onClick={handleShowAllProducts}>Show All Products</button>

                <ul className='products-list'>
                    {products.map( ( product ) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            editBtn={handleEdit}
                            deleteBtn={handleDelete}
                        />
                    ) )}
                </ul>

            </section >
        </section>

    );
};


