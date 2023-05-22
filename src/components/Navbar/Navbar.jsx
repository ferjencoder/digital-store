

export const Navbar = () => {
    return (
        <nav className='navbar-container'>
            <section className='navbar-logo__container'>
                <img
                    className='navbar-logo'
                    src="https://res.cloudinary.com/ferjen/image/upload/v1684726692/digital-store/logo/llama-icon-256x256_oqoifa.svg"
                    alt="Llama logo"
                />
                <h4 className='ff-secondary'>Digital-Store</h4>
            </section>
            <section>
                <ul className='navbar-list'>
                    <li className='ff-primary uppercase'>Products</li>
                    <li className='ff-primary uppercase'>Manager</li>
                </ul>
            </section>
        </nav>
    )
}
