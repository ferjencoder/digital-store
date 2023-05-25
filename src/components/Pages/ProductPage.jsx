// ProductPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductForm } from '../ProductForm/ProductForm';
import { Navbar } from '../Navbar/Navbar';

export const ProductPage = () => {
    const [ products, setProducts ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ selectedProduct, setSelectedProduct ] = useState( null );

    const fetchProducts = async () => {
        try {
            setIsLoading( true );
            const response = await axios.get( '/api/products' );
            setProducts( response.data );
        } catch ( error ) {
            console.error( error );
            setError( 'Error fetching products' );
        } finally {
            setIsLoading( false );
        }
    };

    useEffect( () => {
        fetchProducts();
    }, [] );

    const handleDelete = async ( product ) => {
        try {
            await axios.delete( `/api/products/${product.id}` );
            fetchProducts();
        } catch ( error ) {
            console.error( error );
            setError( 'Error deleting product' );
        }
    };

    const handleEdit = ( product ) => {
        setSelectedProduct( product );
    };

    const handleShowAllProducts = async () => {
        fetchProducts();
    };

    return (
        <>
            <Navbar />
            <main className="main-container">
                <h1 className="ff-secondary">Digital Store</h1>
                <section className="productPage-container">
                    <section className="productsForm-section">
                        <ProductForm
                            selectedProduct={selectedProduct}
                            onFetchProducts={fetchProducts}
                        />
                    </section>
                    <section className="products-section">
                        <button
                            className="btn-delete ff-secondary fs-3"
                            onClick={handleShowAllProducts}
                        >
                            Show All Products
                        </button>
                        {error ? (
                            <div>Error: {error}</div>
                        ) : (
                            <ul className="products-list">
                                {products.slice( 0, -1 ).map( ( product ) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        editBtn={handleEdit}
                                        deleteBtn={handleDelete}
                                    />
                                ) )}
                                {products.length > 0 && (
                                    <ProductItem
                                        key={products[ products.length - 1 ].id}
                                        product={products[ products.length - 1 ]}
                                        editBtn={handleEdit}
                                        deleteBtn={handleDelete}
                                    />
                                )}
                            </ul>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};
