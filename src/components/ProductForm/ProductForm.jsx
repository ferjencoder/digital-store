

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

        <>
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
                    className='btn-success ff-secondary fs-3'
                    type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
            </form>

            <div>
                <img
                    className='form-llama'
                    src="https://res.cloudinary.com/ferjen/image/upload/v1684735620/digital-store/llamas/Default_full_body_shot_of_a_cute_sly_llama_with_long_neck_a_mi_2_6bdb94b8-beb0-449e-888e-44af380145f8_0_pamxlo.png"
                    alt="llama" />
            </div>
        </>
    );
};
