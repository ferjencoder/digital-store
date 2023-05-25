

const priceInARS = ( precio ) => {
    //Format price
    let precioToFormat = precio;
    const options = {
        style: 'currency',
        currency: 'ARS',
        maximumSignificantDigits: 3,
    };
    const priceInARS = new Intl.NumberFormat( 'es-AR', options ).format( precioToFormat );
    return priceInARS;
};


export const ProductItem = ( { product, editBtn, deleteBtn } ) => {

    return (

        <li key={product.id} className='product-item'>
            <img
                src={product.thumbnails[ 0 ]}
                alt={`Image of ${product.title}`}
                className='product-item__image'
            />
            <div className='product-item__body'>
                <p className='ff-secondary fs-2 ls-1'>{product.title}</p>
                <p>{product.category}</p>
                <p>{product.shortDescription}</p>
                <p>Price: {priceInARS( product.price )}</p>
            </div>
            <div className='product-item__buttons'>
                <button
                    className='btn-edit ff-secondary fs-2'
                    onClick={() => editBtn( product )}>
                    Edit
                </button>

                <button
                    className='btn-delete ff-secondary fs-2'
                    onClick={() => deleteBtn( product )}>
                    Delete
                </button>
            </div>
        </li>

    );
};
