

export const ProductItem = ( { product, editBtn, deleteBtn } ) => {

    return (

        <li key={product.id} className='product-item'>
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>

            <button onClick={() => editBtn( product )}>
                Edit
            </button>

            <button onClick={() => deleteBtn( product )}>
                Delete
            </button>
        </li>

    );
};
