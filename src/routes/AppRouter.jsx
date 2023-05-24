import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductPage } from '../components/Pages/ProductPage';
import { LoginPage } from '../components/Pages/LoginPage';


export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'not-authenticated'

    return (

        <Routes>

            {
                ( authStatus === 'not-authenticated' )
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<ProductPage />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />

        </Routes>
    )
};

{/* <Navbar />
<main className='main-container'>
  <h1 className='ff-secondary'> Digital Store</h1>
  <ProductPage />
</main> */}