

import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProductForm = ( { selectedProduct, onFetchProducts } ) => {
    const [ categories, setCategories ] = useState( [] );
    const [ formData, setFormData ] = useState( {
        title: '',
        category: '',
        description: '',
        price: 0,
        code: '',
        demoUrl: '',
        shortDescription: '',
        thumbnails: [],
        techStack: [],
        stock: 0,
    } );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( null );

    useEffect( () => {
        const fetchData = async () => {
            setIsLoading( true );
            try {
                await fetchCategories();
                if ( selectedProduct ) {
                    setFormData( selectedProduct );
                } else {
                    setFormData( {
                        title: '',
                        category: '',
                        description: '',
                        price: 0,
                        code: '',
                        demoUrl: '',
                        shortDescription: '',
                        thumbnails: [],
                        techStack: [],
                        stock: 0,
                    } );
                }
            } catch ( err ) {
                setError( err.message );
            } finally {
                setIsLoading( false );
            }
        };
        fetchData();
    }, [ selectedProduct ] );

    const fetchCategories = async () => {
        const response = await axios.get( '/api/categories' );
        setCategories( response.data );
    };

    const handleChange = ( e ) => {
        const { name, value } = e.target;

        if ( name === 'stock' || name === 'price' ) {
            // Parse the value as a number
            let numericValue = parseFloat( value );

            // Check if the value is a positive number
            if ( numericValue < 0 || isNaN( numericValue ) ) {
                // Set the value to 0 if it's negative or NaN
                numericValue = 0;
            }

            // Update the state with the validated numeric value
            setFormData( ( prevData ) => ( {
                ...prevData,
                [ name ]: numericValue,
            } ) );
        } else {
            // For other fields, update the state as usual
            setFormData( ( prevData ) => ( {
                ...prevData,
                [ name ]: value,
            } ) );
        }
    };

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        setIsLoading( true );
        try {
            if ( selectedProduct ) {
                await axios.put(
                    `/api/products/${selectedProduct.id}`,
                    formData
                );
            } else {
                await axios.post( '/api/products', formData );
            }
            setFormData( {
                title: '',
                category: '',
                description: '',
                price: 0,
                code: '',
                demoUrl: '',
                shortDescription: '',
                thumbnails: [],
                techStack: [],
                stock: 0,
            } );
            await onFetchProducts();
        } catch ( err ) {
            setError( err.message );
        } finally {
            setIsLoading( false );
        }
    };

    if ( isLoading ) {
        return <div>Loading...</div>;
    }

    if ( error ) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <form className="products-section" onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select a category
                    </option>
                    {categories.map( ( category ) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ) )}
                </select>
                <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Code"
                    required
                />
                <input
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleChange}
                    placeholder="Demo URL"
                    required
                />
                <input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Short Description"
                    required
                />
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    name="thumbnails"
                    value={formData.thumbnails}
                    onChange={handleChange}
                    placeholder="Thumbnails"
                    required
                />
                <input
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    placeholder="Tech Stack"
                    required
                />
                <input
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                />
                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <button className="btn-success ff-secondary fs-3" type="submit">
                    {onSelectedProduct ? 'Update' : 'Create'}
                </button>
            </form>

            <div>
                <img
                    className="form-llama"
                    src="https://res.cloudinary.com/ferjen/image/upload/v1684735620/digital-store/llamas/Default_full_body_shot_of_a_cute_sly_llama_with_long_neck_a_mi_2_6bdb94b8-beb0-449e-888e-44af380145f8_0_pamxlo.png"
                    alt="llama"
                />
            </div>
        </>
    );
};
