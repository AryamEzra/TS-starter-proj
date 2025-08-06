import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage'; 
import OrdersPage from './pages/OrdersPage';
import TrackingPage from './pages/TrackingPage';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/tracking" element={<TrackingPage />} />

          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;