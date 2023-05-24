

import { useState, useEffect } from 'react';
import axios from 'axios';


export const ProductForm = () => {
    const [ categories, setCategories ] = useState( [] );
    const [ products, setProducts ] = useState( [] );
    const [ formData, setFormData ] = useState( {
        title: '',
        category: '',
        description: '',
        price: '',
        code: '',
        demoUrl: '',
        shortDescription: '',
        thumbnails: [],
        techStack: [],
    } );
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

    useEffect( () => {
        fetchCategories();
    }, [] );

    const fetchCategories = async () => {
        try {
            const data = await fs.promises.readFile( CATEGORIES_FILE_PATH, 'utf-8' );
            const categoriesData = JSON.parse( data );
            setCategories( categoriesData.categories );
        } catch ( error ) {
            console.error( error );
        }
    };

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData( ( prevData ) => ( {
            ...prevData,
            [ name ]: value,
        } ) );
    };

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        if ( selectedProduct ) {
            await axios.put( `/api/products/${selectedProduct.id}`, formData );
        } else {
            await axios.post( '/api/products', formData );
        }

        setFormData( {
            title: '',
            category: '',
            description: '',
            price: '',
            code: '',
            demoUrl: '',
            shortDescription: '',
            thumbnails: [],
            techStack: [],
        } );
        setSelectedProduct( null );
        fetchProducts();
    };

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
                    <option
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        required
                    >
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
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <button className="btn-success ff-secondary fs-3" type="submit">
                    {selectedProduct ? 'Update' : 'Create'}
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
