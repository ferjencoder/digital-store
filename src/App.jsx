

import axios from 'axios';
// import dotenv from 'dotenv';
import { ProductPage } from './components/Pages/ProductPage';

// dotenv.config();

// const PORT = process.env.REACT_APP_PORT;

axios.defaults.baseURL = 'http://localhost:8000';

export const App = () => {
  return (
    <main className='main-container'>
      <h1> Digital Store</h1>
      <ProductPage />
    </main>
  )
}
