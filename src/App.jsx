

import axios from 'axios';
import { ProductPage } from './components/Pages/ProductPage';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

axios.defaults.baseURL = 'http://localhost:8000';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
